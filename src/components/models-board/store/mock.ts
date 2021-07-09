import { ColumnType } from "../meta/column-meta";
import { PackageStatus } from "../meta/package-meta";
import { RelationType } from "../meta/relation-meta";

export const packages = [
  {
    uuid: 'system-1',
    name: 'System',
    parent: undefined,
    status: PackageStatus.EDITING,
    entities: [
      {
        uuid: 'system-2',
        name: 'RxUser',
        columns: [
          {
            uuid: 'system-3',
            name: 'id',
            type: ColumnType.Number,
            primary: true,
            generated: true,
          },
          {
            uuid: 'system-4',
            name: 'name',
            type: ColumnType.String,
          },
          {
            uuid: 'system-5',
            name: 'content',
            type: ColumnType.String,
          },
          {
            uuid: 'system-6',
            name: 'title',
            type: ColumnType.String,
          },
        ],
      },
      {
        uuid: 'system-11',
        name: 'RxRole',
        columns: [
          {
            uuid: 'system-13',
            name: 'id',
            type: ColumnType.Number,
            primary: true,
            generated: true,
          },
          {
            uuid: 'system-14',
            name: 'name',
            type: ColumnType.String,
          },
          {
            uuid: 'system-15',
            name: 'description',
            type: ColumnType.String,
          },
        ],
      },
    ],
    diagrams: [
      {
        uuid: 'system-999',
        name: 'ER图',
        nodes: [
          {
            id: 'system-2',
            x: 240,
            y: 140,
            width: 200,
            height: 140,
          },
        ],
        edges: [],
      },
    ],
    relations: [
      {
        uuid: 'relation1',
        relationType: RelationType.MANY_TO_MANY,
        sourceId: 'system-2',
        targetId: 'system-11',
        roleOnSource: 'roles',
        roleOnTarget: 'users',
      },
    ],
  },
];
