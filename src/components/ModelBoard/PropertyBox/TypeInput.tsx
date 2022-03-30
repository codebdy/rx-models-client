import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { memo, useCallback } from "react";
import intl from "react-intl-universal";
import { useEnums } from "../hooks/useEnums";
import { useServiceId } from "../hooks/useServiceId";
import { useValueObjects } from "../hooks/useValueObjects";
import { ValueType } from "../meta/ValueType";

export const TypeInput = memo(
  (props: {
    disabled?: boolean;
    valueType: ValueType;
    typeUuid?: string;
    onTypeChange: (valueType: ValueType) => void;
    onTypeUuidChange: (typeUuid: string) => void;
  }) => {
    const { disabled, valueType, typeUuid, onTypeChange, onTypeUuidChange } = props;
    const serviceId = useServiceId();
    const enums = useEnums(serviceId);
    const valueObjects = useValueObjects(serviceId);
    const handleTypeChange = useCallback(
      (event: SelectChangeEvent<ValueType>) => {
        const type = event.target.value as any;
        onTypeChange(type);
      },
      [onTypeChange]
    );

    const handleValueObjectChange = useCallback(
      (event: SelectChangeEvent<string>) => {
        onTypeUuidChange(event.target.value)
      },
      [onTypeUuidChange]
    );

    return (
      <>
        <Grid item xs={12}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            disabled={disabled}
          >
            <InputLabel>{intl.get("data-type")}</InputLabel>
            <Select
              value={valueType}
              onChange={handleTypeChange}
              label={intl.get("data-type")}
            >
              <MenuItem value={ValueType.ID}>ID</MenuItem>
              <MenuItem value={ValueType.Int}>Int</MenuItem>
              <MenuItem value={ValueType.Float}>Float</MenuItem>
              <MenuItem value={ValueType.Boolean}>Boolean</MenuItem>
              <MenuItem value={ValueType.String}>String</MenuItem>
              <MenuItem value={ValueType.Date}>Date</MenuItem>
              <MenuItem value={ValueType.Enum}>{intl.get("enum")}</MenuItem>
              <MenuItem value={ValueType.ValueObject}>
                {intl.get("value-object")}
              </MenuItem>
              <MenuItem value={ValueType.IDArray}>
                ID {intl.get("array")}
              </MenuItem>
              <MenuItem value={ValueType.IntArray}>
                Int {intl.get("array")}
              </MenuItem>
              <MenuItem value={ValueType.FloatArray}>
                Float {intl.get("array")}
              </MenuItem>
              <MenuItem value={ValueType.StringArray}>
                String {intl.get("array")}
              </MenuItem>
              <MenuItem value={ValueType.DateArray}>
                Date {intl.get("array")}
              </MenuItem>
              <MenuItem value={ValueType.EnumArray}>
                {intl.get("enum")}
                {intl.get("array")}
              </MenuItem>
              <MenuItem value={ValueType.ValueObjectArray}>
                {intl.get("value-object")}
                {intl.get("array")}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {(valueType === ValueType.Enum ||
          valueType === ValueType.EnumArray) && (
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              disabled={disabled}
            >
              <InputLabel>{intl.get("enum-class")}</InputLabel>
              <Select
                value={typeUuid || ""}
                onChange={handleValueObjectChange}
                label={intl.get("enum-class")}
              >
                {enums.map((enumEntity) => {
                  return (
                    <MenuItem key={enumEntity.uuid} value={enumEntity.uuid}>
                      {enumEntity.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}
        {(valueType === ValueType.ValueObject ||
          valueType === ValueType.ValueObjectArray) && (
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              disabled={disabled}
            >
              <InputLabel>{intl.get("value-object")}</InputLabel>
              <Select
                value={typeUuid || ""}
                onChange={handleValueObjectChange}
                label={intl.get("value-object")}
              >
                {valueObjects.map((interfaceEntity) => {
                  return (
                    <MenuItem
                      key={interfaceEntity.uuid}
                      value={interfaceEntity.uuid}
                    >
                      {interfaceEntity.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        )}
      </>
    );
  }
);
