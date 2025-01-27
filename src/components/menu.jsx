/* eslint-disable react/prop-types */
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddchartIcon from '@mui/icons-material/Addchart';
import StorageIcon from '@mui/icons-material/Storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2GroupTransition,
  TreeItem2Label,
  TreeItem2Root,
  TreeItem2Checkbox,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { forwardRef } from 'react';

const onClickHandle = (itemId, label, setTitle) => {
    let msg = label;
    if(itemId === '2' || itemId === '5')
        return;
    //if(itemId === '1')
     //   msg = 'Dashboard - Empresa 1';
    setTitle(msg);
}


const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
}));

const CustomTreeItem = forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, setTitle, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <CustomTreeItemContent {...getContentProps()}>
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>{
            itemId === '1' ? <DashboardIcon /> : itemId === '2' ? <AddchartIcon /> : itemId === '5' ? <StorageIcon /> : itemId === '8' ? <ContactSupportIcon /> : itemId === '3' ? <CloudUploadIcon /> : itemId === '4' ? <SummarizeIcon /> : itemId === '6' ? <BusinessIcon /> : itemId === '7' ? <PeopleAltIcon /> : null}
            <TreeItem2Label {...getLabelProps()} className={` ${(itemId === '1' || itemId === '2' || itemId === '5' || itemId === '8') ? ' !text-lg !font-bold' : '' }  `} onClick={()=>onClickHandle(itemId, label, setTitle)}/>
          </Box>
        </CustomTreeItemContent>
        {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

export default function Menu({setTitle}) {
  return (
    <>
      <SimpleTreeView defaultExpandedItems={['2', '5']}>
        <CustomTreeItem itemId="1" label="Dashboard" setTitle={setTitle}>
        </CustomTreeItem>
        <CustomTreeItem itemId="2" label="Datos" >
          <CustomTreeItem itemId="3" label="Carga" setTitle={setTitle} />
          <CustomTreeItem itemId="4" label="Informe de errores" setTitle={setTitle} />          
        </CustomTreeItem>
        <CustomTreeItem itemId="5" label="Mantenedores" >
            <CustomTreeItem itemId="6" label="Empresas" setTitle={setTitle} />
            <CustomTreeItem itemId="7" label="Usuarios" setTitle={setTitle} />
        </CustomTreeItem>
        <CustomTreeItem itemId="8" label="Contacto" setTitle={setTitle}>
        </CustomTreeItem>
      </SimpleTreeView>
    </>
    
  );
}
