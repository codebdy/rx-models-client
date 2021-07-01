import { ColumnType } from "../meta/column-meta";
import { RootMeta } from "../meta/root-meta";

export const rootMeta:RootMeta = {
  packageMetas:[
    {
      id: '1',
      name: 'System',
      parent: undefined,
      children: [],
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
  relationMetas:[],
}