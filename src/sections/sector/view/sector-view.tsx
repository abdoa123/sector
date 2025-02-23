import { useState,useEffect , useCallback } from 'react';
import axios from 'axios';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

} from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { SectorTableRow } from '../sector-table-row';
import { SectorTableHead } from '../sector-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { SectorTableToolbar } from '../sector-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import sectorsData from '../../../../sectors.json'; // Import JSON file

// Define sector type
interface SectorProps {
  id: number;
  name: string;
  createdAt: string;
}

// ----------------------------------------------------------------------

export function SectorView() {
  const table = useTable();
  useEffect(() => {
    const fetchSectors = async () => {
     
      try {
        const response = await axios.get('http://localhost:8080/api/sectors/sectors'); // Replace with your actual API endpoint
        setSectors(response.data);
      } catch (err) {
      
        console.error(err);
      }
     
    };
  
    fetchSectors();
  }, []); // Runs once when the component mounts
  const [newSectorName, setNewSectorName] = useState('');
  const [open, setOpen] = useState(false);

  // Function to add new sector
const handleAddSector = async () => {
  if (!newSectorName.trim()) return;

  const newSector = {
    name: newSectorName,
    createdAt: new Date().toISOString().split('T')[0],
  };

  try {
    const response = await axios.post('http://localhost:8080/api/sectors/sectors', newSector);
    setSectors([...sectors, response.data.addSector]); // Update state with new sector
    setOpen(false); // Close modal
    setNewSectorName(''); // Reset input
  } catch (err) {
    console.error('Failed to add sector', err);
  }
};
  const [filterName, setFilterName] = useState('');
  const [sectors, setSectors] = useState<SectorProps[]>([]);

  const dataFiltered: SectorProps[] = applyFilter({
    inputData: sectors,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          القطاعات
        </Typography>
        <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => setOpen(true)} // Open modal
      >
        اضافة قطاع
      </Button>
      </Box>

      <Card>
        <SectorTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <SectorTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={sectors.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    sectors.map((sector) => sector.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'اسم القطاع' },
                  { id: 'createdAt', label: 'تاريخ الاضافة' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <SectorTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, sectors.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={sectors.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
        {/* Add Sector Modal */}
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>إضافة قطاع جديد</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="اسم القطاع"
          type="text"
          fullWidth
          variant="outlined"
          value={newSectorName}
          onChange={(e) => setNewSectorName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          إلغاء
        </Button>
        <Button onClick={handleAddSector} color="primary" variant="contained">
          حفظ
        </Button>
      </DialogActions>
    </Dialog>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
