import React, { useCallback, useMemo } from "react";
import intl from "react-intl-universal";
import {
  Box,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import LazyTextField from "components/ModelBoard/PropertyBox/LazyTextField";
import {
  RelationMeta,
  RelationMultiplicity,
  RelationType,
} from "../meta/RelationMeta";
import { useClass } from "../hooks/useClass";
import { useChangeRelation } from "../hooks/useChangeRelation";
import { useServiceId } from "../hooks/useServiceId";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const RelationPanel = (props: { relation: RelationMeta }) => {
  const { relation } = props;
  const [sourceExpanded, setSourceExpanded] = React.useState(false);
  const serviceId = useServiceId();
  const source = useClass(relation.sourceId, serviceId);
  const target = useClass(relation.targetId, serviceId);
  const changeRelation = useChangeRelation(serviceId);

  const handleToggleSource = useCallback(() => {
    setSourceExpanded((a) => !a);
  }, []);

  const handleSourceMultiplicityChange = useCallback(
    (event: SelectChangeEvent<RelationMultiplicity>) => {
      changeRelation({
        ...relation,
        sourceMutiplicity: event.target.value as RelationMultiplicity,
      });
    },
    [changeRelation, relation]
  );

  const handleTargetMultiplicityChange = useCallback(
    (event: SelectChangeEvent<RelationMultiplicity>) => {
      changeRelation({
        ...relation,
        targetMultiplicity: event.target.value as RelationMultiplicity,
      });
    },
    [changeRelation, relation]
  );

  const handleSourceRoleChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        roleOfTarget: event.target.value.trim(),
      });
    },
    [changeRelation, relation]
  );

  const handleSourceDescriptionChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        descriptionOnSource: event.target.value,
      });
    },
    [changeRelation, relation]
  );
  const handleTargetRoleChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        roleOfSource: event.target.value.trim(),
      });
    },
    [changeRelation, relation]
  );

  const handleTargetDescriptionChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeRelation({
        ...relation,
        descriptionOnTarget: event.target.value,
      });
    },
    [changeRelation, relation]
  );

  const isInherit = useMemo(
    () => RelationType.INHERIT === relation.relationType,
    [relation.relationType]
  );

  return (
    <>
      {isInherit ? (
        <Grid item xs={12}>
          {intl.get("inherit")}
        </Grid>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              cursor: "pointer",
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              pl: 2,
              zIndex: 1,
            }}
            onClick={handleToggleSource}
          >
            <Typography variant="subtitle1">
              {source?.name} {intl.get("side")}
            </Typography>
            <ChevronRightIcon />
          </Box>
          <Collapse in={sourceExpanded} timeout="auto" unmountOnExit>
            <Grid container spacing={2} sx={{ pt: 2, pl: 2 }}>
              <Grid item xs={12}>
                <LazyTextField
                  label={intl.get("role-name")}
                  value={relation.roleOfTarget || ""}
                  onChange={handleSourceRoleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>{intl.get("multiplicity")}</InputLabel>
                  <Select
                    value={relation.sourceMutiplicity || ""}
                    onChange={handleSourceMultiplicityChange}
                    label={intl.get("multiplicity")}
                  >
                    <MenuItem value={RelationMultiplicity.ZERO_ONE}>
                      {RelationMultiplicity.ZERO_ONE}
                    </MenuItem>
                    {relation.relationType !==
                      RelationType.ONE_WAY_COMBINATION &&
                      relation.relationType !==
                        RelationType.TWO_WAY_COMBINATION && (
                        <MenuItem value={RelationMultiplicity.ZERO_MANY}>
                          {RelationMultiplicity.ZERO_MANY}
                        </MenuItem>
                      )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LazyTextField
                  label={intl.get("description")}
                  value={relation.descriptionOnSource || ""}
                  multiline
                  rows={4}
                  onChange={handleSourceDescriptionChange}
                />
              </Grid>
            </Grid>
          </Collapse>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {target?.name} {intl.get("side")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LazyTextField
              label={intl.get("role-name")}
              value={relation.roleOfSource || ""}
              onChange={handleTargetRoleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel>{intl.get("multiplicity")}</InputLabel>
              <Select
                value={relation.targetMultiplicity || ""}
                onChange={handleTargetMultiplicityChange}
                label={intl.get("multiplicity")}
              >
                <MenuItem value={RelationMultiplicity.ZERO_ONE}>
                  {RelationMultiplicity.ZERO_ONE}
                </MenuItem>
                <MenuItem value={RelationMultiplicity.ZERO_MANY}>
                  {RelationMultiplicity.ZERO_MANY}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LazyTextField
              label={intl.get("description")}
              value={relation.descriptionOnTarget || ""}
              multiline
              rows={4}
              onChange={handleTargetDescriptionChange}
            />
          </Grid>
        </>
      )}
    </>
  );
};
