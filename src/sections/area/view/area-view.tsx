import { useState,useEffect , useCallback } from 'react';
import axios from 'axios';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,  
  MenuItem,
  Select,
  InputLabel,
  FormControl,

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
import { AreaTableRow } from '../area-table-row';
import { AreaTableHead } from '../area-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { SectorTableToolbar } from '../area-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// Define AreaProps type
export type AreaProps = {
  id: number;
  name: string;
  sector:{name:string,id:number};
  createdAt: string;
};

// ----------------------------------------------------------------------

export function AreaView() {
  const table = useTable();
   // Fetch sectors from API
   useEffect(() => {
    axios
      .get("http://localhost:8080/api/sectors/sectors/")
      .then((response) => {
        setSectors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sectors:", error);
      });
  }, []);
  useEffect(() => {
    const fetchAreas = async () => {
     
      try {
        const response = await axios.get('http://localhost:8080/api/areas/areas'); // Replace with your actual API endpoint
        setAreas(response.data);
      } catch (err) {
      
        console.error(err);
      }
     
    };
  
    fetchAreas();
  }, []); // Runs once when the component mounts
  const [newSectorName, setNewSectorName] = useState('');
  const [open, setOpen] = useState(false);

  // Function to add new sector
const handleAddArea = async (newAreaName:any,sectorId:any) => {
  
  if (!newAreaName.trim()) return;

  const newSector = {
    name: newAreaName,
    sectorId,
    createdOn: new Date().toISOString().split('T')[0],
  };

  try {
    const response = await axios.post('http://localhost:8080/api/areas/areas', newSector);
 // Find the selected sector object from the sectors list
 const selectedSector:any = sectors.find((x:any) => x.id === sectorId);

 // Create a new area object with sector details
 const newArea = {
   ...response.data, // Keep API response data
   sector: {
     id: sectorId,
     name: selectedSector ? selectedSector.name : "Unknown", // Assign sector name correctly
   },
 };

 setAreas([...areas, newArea]); // Update state with new area
    setOpen(false); // Close modal
    setNewSectorName(''); // Reset input
  } catch (err) {
    console.error('Failed to add sector', err);
  }
};
  const [filterName, setFilterName] = useState('');
  const [newAreaName, setNewAreaName] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [sectors, setSectors] = useState([]);
    const [areas, setAreas] = useState<AreaProps[]>([]);

  const dataFiltered: AreaProps[] = applyFilter({
    inputData: areas,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          المناطق
        </Typography>
        <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => setOpen(true)} // Open modal
      >
        اضافة منطقة
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
              <AreaTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={areas.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    areas.map((sector) => sector.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'اسم المنطقة' },
                  { id: 'sectorName', label: 'اسم القطاع' },
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
                    <AreaTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, areas.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={areas.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
        {/* Add Sector Modal */}
        <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>إضافة منطقة جديدة</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="اسم المنطقة"
          type="text"
          fullWidth
          variant="outlined"
          value={newAreaName}
          onChange={(e) => setNewAreaName(e.target.value)}
        />

        {/* Sector Dropdown */}
        <FormControl fullWidth margin="dense">
          <InputLabel>اختر القطاع</InputLabel>
          <Select
            value={sectorId}
            onChange={(e) => setSectorId(e.target.value)}
          >
            {sectors.map((sec:any) => (
              <MenuItem key={sec.id} value={sec.id}>
                {sec.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          إلغاء
        </Button>
        <Button
          onClick={() => handleAddArea(newAreaName, sectorId)}
          color="primary"
          variant="contained"
          disabled={!newAreaName || !sectorId}
        >
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
