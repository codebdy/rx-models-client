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
import { useEntities } from "../hooks/useEntities";
import { useEnums } from "../hooks/useEnums";
import { useServiceId } from "../hooks/useServiceId";
import { useValueObjects } from "../hooks/useValueObjects";
import { Type } from "../meta/Type";

export const TypeInput = memo(
  (props: {
    disabled?: boolean;
    valueType: Type;
    typeUuid?: string;
    withEntityType?: boolean;
    onTypeChange: (valueType: Type) => void;
    onTypeUuidChange: (typeUuid: string) => void;
  }) => {
    const {
      disabled,
      valueType,
      typeUuid,
      withEntityType,
      onTypeChange,
      onTypeUuidChange,
    } = props;
    const serviceId = useServiceId();
    const enums = useEnums(serviceId);
    const valueObjects = useValueObjects(serviceId);
    const entities = useEntities(serviceId);
    const handleTypeChange = useCallback(
      (event: SelectChangeEvent<Type>) => {
        const type = event.target.value as any;
        onTypeChange(type);
      },
      [onTypeChange]
    );

    const handleTypeUuidChange = useCallback(
      (event: SelectChangeEvent<string>) => {
        onTypeUuidChange(event.target.value);
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
              <MenuItem value={Type.ID}>ID</MenuItem>
              <MenuItem value={Type.Int}>Int</MenuItem>
              <MenuItem value={Type.Float}>Float</MenuItem>
              <MenuItem value={Type.Boolean}>Boolean</MenuItem>
              <MenuItem value={Type.String}>String</MenuItem>
              <MenuItem value={Type.Date}>Date</MenuItem>
              <MenuItem value={Type.Enum}>{intl.get("enum")}</MenuItem>
              <MenuItem value={Type.ValueObject}>
                {intl.get("value-object")}
              </MenuItem>
              {withEntityType && (
                <MenuItem value={Type.Entity}>
                  {intl.get("entity")}
                </MenuItem>
              )}
              <MenuItem value={Type.IDArray}>
                ID {intl.get("array")}
              </MenuItem>
              <MenuItem value={Type.IntArray}>
                Int {intl.get("array")}
              </MenuItem>
              <MenuItem value={Type.FloatArray}>
                Float {intl.get("array")}
              </MenuItem>
              <MenuItem value={Type.StringArray}>
                String {intl.get("array")}
              </MenuItem>
              <MenuItem value={Type.DateArray}>
                Date {intl.get("array")}
              </MenuItem>
              <MenuItem value={Type.EnumArray}>
                {intl.get("enum")}
                {intl.get("array")}
              </MenuItem>
              <MenuItem value={Type.ValueObjectArray}>
                {intl.get("value-object")}
                {intl.get("array")}
              </MenuItem>
              {withEntityType && (
                <MenuItem value={Type.EntityArray}>
                  {intl.get("entity")}
                  {intl.get("array")}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        {(valueType === Type.Enum ||
          valueType === Type.EnumArray) && (
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
                onChange={handleTypeUuidChange}
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
        {(valueType === Type.ValueObject ||
          valueType === Type.ValueObjectArray) && (
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
                onChange={handleTypeUuidChange}
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
        {(valueType === Type.Entity ||
          valueType === Type.EntityArray) && (
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              disabled={disabled}
            >
              <InputLabel>{intl.get("entity-class")}</InputLabel>
              <Select
                value={typeUuid || ""}
                onChange={handleTypeUuidChange}
                label={intl.get("entity-class")}
              >
                {entities.map((entity) => {
                  return (
                    <MenuItem
                      key={entity.uuid}
                      value={entity.uuid}
                    >
                      {entity.name}
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
