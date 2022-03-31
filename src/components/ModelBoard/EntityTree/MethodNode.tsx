import { IconButton, SvgIcon } from "@mui/material";
import { TreeItem } from "@mui/lab";
import { NodeText } from "./NodeText";
import { TreeNodeLabel } from "./TreeNodeLabel";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSetRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useServiceId } from "../hooks/useServiceId";
import { MethodMeta } from "../meta/MethodMeta";
import { useDeleteMethod } from "../hooks/useDeleteMethod";

export const MethodNode = (props: { method: MethodMeta }) => {
  const { method } = props;
  const serviceId = useServiceId();
  const setSelectedElement = useSetRecoilState(selectedElementState(serviceId));
  const deletedMethod = useDeleteMethod(serviceId);
  const handleClick = () => {
    setSelectedElement(method.uuid);
  };

  const handleDelete = () => {
    deletedMethod(method.uuid);
  };
  return (
    <TreeItem
      nodeId={method.uuid}
      label={
        <TreeNodeLabel
          action={
            <IconButton size="small" onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          }
          onClick={handleClick}
        >
          <SvgIcon sx={{ fontSize: 12 }}>
            <path
              fill="currentColor"
              d="M15.6,5.29C14.5,5.19 13.53,6 13.43,7.11L13.18,10H16V12H13L12.56,17.07C12.37,19.27 10.43,20.9 8.23,20.7C6.92,20.59 5.82,19.86 5.17,18.83L6.67,17.33C6.91,18.07 7.57,18.64 8.4,18.71C9.5,18.81 10.47,18 10.57,16.89L11,12H8V10H11.17L11.44,6.93C11.63,4.73 13.57,3.1 15.77,3.3C17.08,3.41 18.18,4.14 18.83,5.17L17.33,6.67C17.09,5.93 16.43,5.36 15.6,5.29Z"
            />
          </SvgIcon>
          <NodeText>
            {method.name}({method.args.length > 0 ? "..." : ""}
            ):{method.typeLabel}
          </NodeText>
        </TreeNodeLabel>
      }
    ></TreeItem>
  );
};
