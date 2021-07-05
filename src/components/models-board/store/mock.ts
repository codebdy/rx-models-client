import { ColumnType } from "../meta/column-meta";
import { ConstraintType, RelationType } from "../meta/relation-meta";
import { RootMeta } from "../meta/root-meta";

export const rootMeta:RootMeta = {
  packageMetas:[
    {
      id: '1',
      name: 'System',
      parent: undefined,
      packages: [],
      classMetas: [
        {
          id: '2',
          name: 'RxUser',
          columns: [
            {
              id: '3',
              name: 'id',
              type: ColumnType.Number,
              primary: true,
              generated: true,
            },
            {
              id: '4',
              name: 'name',
              type: ColumnType.String,
            },
            {
              id: '5',
              name: 'content',
              type: ColumnType.String,
            },
            {
              id: '6',
              name: 'title',
              type: ColumnType.String,
            },
          ],
        },
        {
          id: '11',
          name: 'RxRole',
          columns: [
            {
              id: '13',
              name: 'id',
              type: ColumnType.Number,
              primary: true,
              generated: true,
            },
            {
              id: '14',
              name: 'name',
              type: ColumnType.String,
            },
            {
              id: '15',
              name: 'description',
              type: ColumnType.String,
            },
          ],
        }
      ],
      diagramMetas: [
        {
          id: '999',
          name: 'ER图',
          nodes: [
            {
              id: '2',
              x: 240,
              y: 140,
              width: 200,
              height: 140,
            }
          ],
          edges: [],
        }
      ]
    }
  ],
  classMetas:[],
  diagramMetas:[],
  relationMetas:[
    {
      id: 'relation1',
      relationType: RelationType.Association,
      constraintType: ConstraintType.MANY_TO_MANY,
      sourceId: '2',
      targetId: '11',
      nameOnSource: 'roles',
      nameOnTarget: 'users'
    }
  ],
}