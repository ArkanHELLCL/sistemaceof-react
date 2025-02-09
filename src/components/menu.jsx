/* eslint-disable react/prop-types */
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddchartIcon from '@mui/icons-material/Addchart';
import StorageIcon from '@mui/icons-material/Storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PublishIcon from '@mui/icons-material/Publish';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
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

const onClickHandle = (itemId, label, setTitle, setMenu) => {
    let msg = label;
    if(itemId === '2' || itemId === '5')
        return;
    let menu = {};
    if(itemId === '1')
        menu = {"Dashboard" : true};
    else if(itemId === '9')
        menu = {"Upload" : true};
    else if(itemId === '10' || itemId === '11')
        menu = {"Download" : true};
    else if(itemId === '6')
        menu = {"Empresas" : true};
    else if(itemId === '7')
        menu = {"Usuarios" : true};
    else if(itemId === '8')
        menu = {"Contacto" : true};

    setMenu(menu);
    setTitle(msg);
}


const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
}));

const CustomTreeItem = forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, setTitle, setMenu, ...other } = props;

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
            itemId === '1' ? <DashboardIcon /> : itemId === '2' ? <AddchartIcon /> : itemId === '5' ? <StorageIcon /> : itemId === '8' ? <ContactSupportIcon /> : itemId === '3' ? <CloudUploadIcon /> : itemId === '4' ? <SummarizeIcon /> : itemId === '6' ? <BusinessIcon /> : itemId === '7' ? <PeopleAltIcon /> : itemId === '9' ? <PublishIcon /> : itemId === '10' ? <UploadFileIcon /> : itemId === '11' ? <CloudDownloadIcon/> : null}
            <TreeItem2Label {...getLabelProps()} className={` ${(itemId === '1' || itemId === '2' || itemId === '5' || itemId === '8' || itemId === '11') ? ' !text-lg !font-bold' : '' }  !truncate`} onClick={()=>onClickHandle(itemId, label, setTitle, setMenu)} />
          </Box>
        </CustomTreeItemContent>
        {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

export default function Menu({setTitle, user, setMenu}) {
    return (
        user?.PER_Id === 1 ?
          <>
            <Box sx={{ minHeight: 200, minWidth: 250, maxHeight: 600, overflowY: 'auto' }} >
              <SimpleTreeView defaultExpandedItems={['2', '5']}>
                <CustomTreeItem itemId="1" label="Dashboard" setTitle={setTitle} setMenu={setMenu}>
                </CustomTreeItem>
                <CustomTreeItem itemId="2" label="Datos" >                            
                  <CustomTreeItem itemId="9" label="Empresa" setTitle={setTitle} setMenu={setMenu}/>
                  <CustomTreeItem itemId="10" label="Informes" setTitle={setTitle} setMenu={setMenu}/>
                </CustomTreeItem>
                <CustomTreeItem itemId="5" label="Mantenedores" >
                    <CustomTreeItem itemId="6" label="Empresas" setTitle={setTitle} setMenu={setMenu}/>
                    <CustomTreeItem itemId="7" label="Usuarios" setTitle={setTitle} setMenu={setMenu}/>
                </CustomTreeItem>                        
              </SimpleTreeView>
            </Box>                
          </>
        : 
          <>
            <Box sx={{ minHeight: 200, minWidth: 250, maxHeight: 600, overflowY: 'auto' }} >
              <SimpleTreeView>
                <CustomTreeItem itemId="1" label="Dashboard" setTitle={setTitle} setMenu={setMenu} />
                <CustomTreeItem itemId="11" label="Descarga" setTitle={setTitle} setMenu={setMenu} />
              </SimpleTreeView>
            </Box>
          </>
    )
}


/*<CustomTreeItem itemId="8" label="Contacto" setTitle={setTitle} setMenu={setMenu}>
                        </CustomTreeItem> */