import { useState,useEffect , useCallback } from 'react';
import axios from 'axios';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

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
import { SectorTableRow } from '../tech-table-row';
import { SectorTableHead } from '../tech-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { SectorTableToolbar } from '../tech-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// Define sector type
interface TechProps {
  id: number;
  orderNumber: string;
  companyName:string;
  issueDate: string;
  issueType:string;
  capelNum:number;
  capenaNum:number;
  baxNumber:number;
  endDate:string;
  createdAt: string;
  central:{
    id: number;
    name: string;
    area: {
      id: number;
      name: string;
      sector: {
        id: number;
        name: string;
      };
  };
};
}
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

export function TechView() {
  const [orderNumber, setOrderNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [issueType, setIssueType] = useState("");
  const [capelNum, setCapelNum] = useState("");
  const [capenaNum, setCapenaNum] = useState("");
  const [baxNumber, setBaxNumber] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [centralId, setCentralId] = useState("");
      const [techs, setTechs] = useState<TechProps[]>([]);
  
  const [sectors, setSectors] = useState([]);
  const [areas, setAreas] = useState([]);
  
  const [centrals, setCentrals] = useState([]);

  // Static Issue Type List
  const issueTypes = ["Repair", "Maintenance", "Installation", "Inspection"];
  const table = useTable();
  useEffect(() => {
    const fetchTech = async () => {
     
      try {
        const response = await axios.get('http://localhost:8080/api/techs/tech'); // Replace with your actual API endpoint
        setTechs(response.data);
      } catch (err) {
      
        console.error(err);
      }
     
    };
    
  
    fetchTech();
  }, []); // Runs once when the component mounts

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

  const fetchAreasBySector = async (id:any) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/areas?sectorId=${Number(id)}`);
      setAreas(response.data); // Update areas list
    } catch (error) {
      console.error("Failed to fetch areas", error);
    }
  };
  const fetchCentralByArea = async (id:any) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/centrals?areaId=${Number(id)}`);
      setCentrals(response.data); // Update areas list
    } catch (error) {
      console.error("Failed to fetch areas", error);
    }
  };
  
  const [newSectorName, setNewSectorName] = useState('');
  const [open, setOpen] = useState(false);

  // Function to add new sector
  const handleAddTech = async () => {
    try {
      const newTech = {
        orderNumber,
        issueDate,
        issueType,
        capelNum,
        capenaNum,
        baxNumber,
        endDate,
        centralId,
        companyName,
      };
       // Convert endDate to a Date object
    const newEndDate = new Date(endDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Check if a tech entry with the same details exists and its endDate is within one year
    const existingTech = techs.find(
      (t) =>
        t.capelNum === Number(capelNum) &&
        t.capenaNum === Number(capenaNum) &&
        t.baxNumber === Number(baxNumber) &&
        t.central.id === Number(centralId) &&
        new Date(t.endDate) > oneYearAgo
    );

    if (existingTech) {
      alert("لا يمكن إضافة هذا الفني، هناك سجل بنفس البيانات ولم يمر عليه عام واحد.");
      return;
    }

      const response = await axios.post("http://localhost:8080/api/techs/tech", newTech);
      const area:any = areas.find((a: any) => a.id === areaId);
      const central:any = centrals.find((a: any) => a.id === centralId);
      const sector:any = sectors.find((a: any) => a.id === sectorId);
       // Construct the full object with the data in the dialog
    const addedTech :TechProps= {
      id: response.data.id, // Get the ID from the response
      orderNumber,
      issueDate,
      issueType,
      companyName,
      capelNum:Number(capelNum),
      capenaNum:Number(capenaNum),
      baxNumber:Number(baxNumber),
      endDate,
      createdAt: new Date().toISOString(), // Or get from response if available
      central: {
        id: Number(centralId),
        name:central?.name ,
        area: {
          id: Number(areaId),
          name: area?.name,
          sector: {
            id: Number(sectorId),
            name: sector?.name,
          },
        },
      },
    };
    // Update the state with the detailed central data
    setTechs([...techs, addedTech]);


      setOpen(false);
      resetFields();
    } catch (error) {
      console.error("Failed to add tech", error);
    }
  };
  const resetFields = () => {
    setOrderNumber("");
    setCompanyName("");
    setIssueDate("");
    setIssueType("");
    setCapelNum("");
    setCapenaNum("");
    setBaxNumber("");
    setEndDate("");
    setSectorId("");
    setAreaId("");
    setCentralId("");
  };
  const selectedRowsData = techs.filter((tech) => table.selected.includes(tech.id.toString()));

  const [filterName, setFilterName] = useState('');

  const dataFiltered: TechProps[] = applyFilter({
    inputData: techs,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          وصف العطل
        </Typography>
        <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => setOpen(true)} // Open modal
      >
        اضافة امر تكليف
      </Button>
      </Box>

      <Card>
        <SectorTableToolbar
          numSelected={table.selected.length}
          selectedRows={selectedRowsData} // Now contains full row data
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
                rowCount={techs.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    techs.map((sector:any) => sector.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'امر تكليف رقم' },
                  { id: '', label: 'اسم الشركة المكلفة' },
                  { id: '' , label:'تاريخ العطل' },
                  { id: '' , label:'نوع العطل' },
                  { id: '' , label:'رقم الكابل' },
                  { id: '' , label:'رقم الكابينه' },
                  { id: '' , label:'رقم البوكس' },
                  { id: '' , label:'تاريخ انتهاء العطل' },
                  { id: '' , label:'القطاع' },
                  { id: '' , label:'المنطقة' },
                  { id: '' , label:'السنترال' },
                  { id: '' , label:'تاريخ الاضافة' },
                  
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
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>إضافة فني جديد</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="رقم الطلب"
          type="text"
          fullWidth
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
                <TextField
          autoFocus
          margin="dense"
          label="اسم الشركة المكلفة"
          type="text"
          fullWidth
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />


        <TextField
          margin="dense"
          label="تاريخ الإصدار"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />

        {/* Issue Type Dropdown */}
        <FormControl fullWidth margin="dense">
          <InputLabel>نوع المشكلة</InputLabel>
          <Select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
            {issueTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="رقم الكابل"
          type="number"
          fullWidth
          value={capelNum}
          onChange={(e) => setCapelNum(e.target.value)}
        />

        <TextField
          margin="dense"
          label="رقم الكبينة"
          type="number"
          fullWidth
          value={capenaNum}
          onChange={(e) => setCapenaNum(e.target.value)}
        />

        <TextField
          margin="dense"
          label="رقم البوكس"
          type="number"
          fullWidth
          value={baxNumber}
          onChange={(e) => setBaxNumber(e.target.value)}
        />

        <TextField
          margin="dense"
          label="تاريخ الانتهاء"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Sector Dropdown */}
        <FormControl fullWidth margin="dense">
          <InputLabel>اختر القطاع</InputLabel>
          <Select value={sectorId}   onChange={(e) => {
          setSectorId(e.target.value);
          fetchAreasBySector(e.target.value); // Fetch areas related to sector
        }}
            >
            {sectors.map((sec:any) => (
              <MenuItem key={sec.id} value={sec.id}>
                {sec.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Area Dropdown (Filtered by Sector) */}
        <FormControl fullWidth margin="dense" disabled={!sectorId}>
          <InputLabel>اختر المنطقة</InputLabel>
          <Select value={areaId}
          onChange={(e) => {
            setAreaId(e.target.value);
             fetchCentralByArea(e.target.value); // Fetch areas related to sector
          }}
          >
        
            {areas.map((area:any) => (
              <MenuItem key={area.id} value={area.id}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Central Dropdown (Filtered by Area) */}
        <FormControl fullWidth margin="dense" disabled={!areaId}>
          <InputLabel>اختر السنترال</InputLabel>
          <Select value={centralId} onChange={(e) => setCentralId(e.target.value)}>
            {centrals.map((ce:any) => (
              <MenuItem key={ce.id} value={ce.id}>
                {ce.name}
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
          onClick={handleAddTech}
          color="primary"
          variant="contained"
          disabled={!orderNumber || !issueDate || !issueType || !capelNum || !capenaNum || !baxNumber || !centralId}
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
