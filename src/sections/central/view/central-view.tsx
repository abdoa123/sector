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
import { CentralTableRow } from '../central-table-row';
import { CentralTableHead } from '../central-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import {CentralTableToolbar } from '../central-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// Define CentralProps type
export type CentralProps = {
  id: number;
  name: string;
  createdAt: string;
  area: {
    id: number;
    name: string;
    sector: {
      id: number;
      name: string;
    };
  };
};


// ----------------------------------------------------------------------

export function CentralView() {
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
        const response = await axios.get('http://localhost:8080/api/centrals/central'); // Replace with your actual API endpoint
        setCentrals(response.data);
      } catch (err) {
      
        console.error(err);
      }
     
    };
  
    fetchAreas();
  }, []); // Runs once when the component mounts
  const [newSectorName, setNewSectorName] = useState('');
  const [open, setOpen] = useState(false);



const handleAddCentral = async (name: string, areaId:any) => {
  try {
    const newSector = {
      name,
      areaId,
      createdOn: new Date().toISOString().split('T')[0],
    };
    const response = await axios.post("http://localhost:8080/api/centrals/central", newSector);
    // Find the related area details from the `areas` state
    const area:any = areas.find((a: any) => a.id === areaId);

    if (!area) {
      console.error("Area not found");
      return;
    }
      // Build the final central object with area & sector details
      const newCentralWithDetails:CentralProps = {
        name,
        id:areaId,
        createdAt: new Date().toISOString().split('T')[0],
        area: {
          id: area.id,
          name: area.name,
          sector: {
            id: area.sector.id,
            name: area.sector.name,
          },
        },
      };
// Update the state with the detailed central data
setCentrals([...centrals, newCentralWithDetails]);
setOpen(false); // Close modal
    setNewCentralName(""); // Reset input
    setSectorId(""); // Reset sector selection
    setAreaId(""); // Reset area selection
  } catch (error) {
    console.error("Failed to add central", error);
  }
};
const fetchAreasBySector = async (sectorId:any) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/areas?sectorId=${Number(sectorId)}`);
    setAreas(response.data); // Update areas list
  } catch (error) {
    console.error("Failed to fetch areas", error);
  }
};
  const [filterName, setFilterName] = useState('');
  const [newCentralName, setNewCentralName] = useState("");
  const [areaId, setAreaId] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [areas, setAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
    const [centrals, setCentrals] = useState<CentralProps[]>([]);

  const dataFiltered: CentralProps[] = applyFilter({
    inputData: centrals,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          السنترالات
        </Typography>
        <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => setOpen(true)} // Open modal
      >
        اضافة سنترال
      </Button>
      </Box>

      <Card>
        <CentralTableToolbar
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
              <CentralTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={centrals.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    centrals.map((sector) => sector.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'اسم السنترال' },
                  { id: 'sectorName', label: 'اسم المنطقة' },
                  { id: 'araeName', label: 'اسم القطاع' },
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
                    <CentralTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, centrals.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={centrals.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
        {/* Add Sector Modal */}
        <Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>إضافة سنترال جديد</DialogTitle>
  <DialogContent>
    {/* Central Name Input */}
    <TextField
      autoFocus
      margin="dense"
      label="اسم السنترال"
      type="text"
      fullWidth
      variant="outlined"
      value={newCentralName}
      onChange={(e) => setNewCentralName(e.target.value)}
    />

    {/* Sector Dropdown */}
    <FormControl fullWidth margin="dense">
      <InputLabel>اختر القطاع</InputLabel>
      <Select
        value={sectorId}
        onChange={(e) => {
          setSectorId(e.target.value);
          fetchAreasBySector(e.target.value); // Fetch areas related to sector
        }}
      >
        {sectors.map((sec: any) => (
          <MenuItem key={sec.id} value={sec.id}>
            {sec.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Area Dropdown (Filtered by Selected Sector) */}
    <FormControl fullWidth margin="dense" disabled={!sectorId}>
      <InputLabel>اختر المنطقة</InputLabel>
      <Select
        value={areaId}
        onChange={(e) => setAreaId(e.target.value)}
      >
        {areas.map((area: any) => (
          <MenuItem key={area.id} value={area.id}>
            {area.name}
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
      onClick={() => handleAddCentral(newCentralName, areaId)}
      color="primary"
      variant="contained"
      disabled={!newCentralName || !areaId}
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
