import { ColumnType } from "../meta/column-meta";
import { RelationType } from "../meta/relation-meta";
import { RootMeta } from "../meta/root-meta";

export const rootMeta:RootMeta = {
  packageMetas:[
    {
      uuid: '1',
      name: 'System',
      parent: undefined,
      packages: [],
      entityMetas: [
        {
          uuid: '2',
          name: 'RxUser',
          columns: [
            {
              uuid: '3',
              name: 'uuid',
              type: ColumnType.Number,
              primary: true,
              generated: true,
            },
            {
              uuid: '4',
              name: 'name',
              type: ColumnType.String,
            },
            {
              uuid: '5',
              name: 'content',
              type: ColumnType.String,
            },
            {
              uuid: '6',
              name: 'title',
              type: ColumnType.String,
            },
          ],
        },
        {
          uuid: '11',
          name: 'RxRole',
          columns: [
            {
              uuid: '13',
              name: 'uuid',
              type: ColumnType.Number,
              primary: true,
              generated: true,
            },
            {
              uuid: '14',
              name: 'name',
              type: ColumnType.String,
            },
            {
              uuid: '15',
              name: 'description',
              type: ColumnType.String,
            },
          ],
        }
      ],
      diagramMetas: [
        {
          uuid: '999',
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
      uuid: 'relation1',
      relationType: RelationType.MANY_TO_MANY,
      sourceId: '2',
      targetId: '11',
      roleOnSource: 'roles',
      roleOnTarget: 'users'
    }
  ],
}