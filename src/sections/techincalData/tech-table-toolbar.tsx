import { jsPDF } from "jspdf";

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import autoTable from 'jspdf-autotable'; // Import autoTable explicitly
import { font } from 'src/components/iconify/font'; // Assume you've saved it

import { Iconify } from 'src/components/iconify';
import { log } from "console";

// Define props to include selected rows
type CentralTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRows: any[]; // Array of selected rows
};


export function SectorTableToolbar({ numSelected, filterName, onFilterName, selectedRows }: CentralTableToolbarProps) {
  const handleExportToPDF = async () => {
  
    
    // Create PDF in LANDSCAPE mode'
    // eslint-disable-next-line new-cap
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    // Add Arabic Font
    // eslint-disable-next-line new-cap
    doc.addFileToVFS('Amiri-Regular.ttf', font.value);
    // eslint-disable-next-line new-cap
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    // eslint-disable-next-line new-cap
    doc.setFont('Amiri');

    // ** Set Arabic Text Alignment Right **
    doc.setFontSize(12); // Reduce font size

    // ** Top Right Section **
    doc.text(`السيد المهندس : ${selectedRows[0].companyName}`, 290, 15, { align: 'right' });
    doc.text(`برجاء التفضل بتنفيذ الاعمال الواردة بامر تكليف نطاق ${selectedRows[0].central?.name || ''}`, 290, 25, { align: 'right' });

    // ** Top Left Section **
    doc.text(`التاريخ : ${new Date(selectedRows[0].createdAt).toLocaleDateString()}`, 10, 15, { align: 'left' });
    doc.text(`امر التكليف : ${selectedRows[0].orderNumber}`, 10, 25, { align: 'left' });

    // ** Table Data **
    const tableData = selectedRows.map((row) => [
      new Date(row.issueDate).toLocaleDateString(),
      row.issueType,
      row.capelNum,
      row.capenaNum,
      row.baxNumber,
      new Date(row.endDate).toLocaleDateString(),
      row.central?.area?.sector?.name,
      row.central?.area?.name,
      row.central?.name
    ]);

    // ** Table with Borders **
    autoTable(doc, {
      startY: 40, // Start below the text
      head: [[
        'تاريخ العطل',
        'نوع العطل',
        'رقم الكابل',
        'رقم الكابينة',
        'رقم البوكس',
        'تاريخ انتهاء العطل',
        'القطاع',
        'المنطقة',
        'السنترال'
      ]],
      body: tableData,
      styles: { font: 'Amiri', fontSize: 12, halign: 'right' },
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Black background, white text
      theme: 'grid', // Ensures full borders
      tableWidth: 'auto' // Allow table to adjust in landscape mode
    });

    // ** Bottom Right Section **
    const finalY = (doc as any).lastAutoTable.finalY + 20; // Add extra spacing
    doc.text(' : تاريخ الاستلام النهائي للعملية', 290, finalY, { align: 'right' });
    doc.text(': اسباب التأخير ان وجد', 290, finalY + 10, { align: 'right' });
    doc.text(' : مدة التأخير', 290, finalY + 20, { align: 'right' });

    // Save PDF
    doc.save('امر تكليف.pdf');
};



  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Export to PDF">
            <IconButton onClick={handleExportToPDF}>
              <Iconify icon="mdi:file-pdf-box" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
