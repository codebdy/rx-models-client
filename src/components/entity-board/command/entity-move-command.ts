import { EntityStore } from "../store/entity-store";
import { SelectedNode } from "../store/entity-board-store";
import { Command } from "./command";
import { PackageStore } from "../store/package";

export class EntityMoveCommand implements Command{
  private oldPackage?: PackageStore;
  private newPackage?: PackageStore;
  constructor(
    private readonly entityStore: EntityStore,
    private readonly newPackageUuid: string,
  ){
    this.oldPackage = entityStore.package;
    this.newPackage = entityStore.getRootStore()?.getPackgeById(newPackageUuid);
  }
  
  excute():SelectedNode{
    this.move(this.oldPackage, this.newPackage);
    return this.entityStore;
  }
  undo():SelectedNode{
    this.move(this.newPackage, this.oldPackage);
    return this.entityStore;
  };

  private move(from?: PackageStore, to?: PackageStore){
    const ownedRelations = from?.relations?.filter(relation=>relation.ownerId === this.entityStore.uuid);
    from?.deleteEntity(this.entityStore.uuid);
    to?.addEntity(this.entityStore)
    ownedRelations?.forEach(relation=>{
      from?.deleteRelation(relation.uuid);
      to?.addRelation(relation);
    })
  }
}