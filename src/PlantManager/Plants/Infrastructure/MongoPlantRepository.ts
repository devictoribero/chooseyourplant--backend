import { PlantRepository } from "../Domain/PlantRepository";
import { Plant } from "../Domain/Plant";
import MongoPlantModel from "./MongoPlantModel";
import { Nullable } from "../../../Shared/Domain/Nullable";
import { PlantAlreadyExists } from "../Domain/PlantAlreadyExists";
import { GeneralError } from "../../../Shared/Domain/GeneralError";
import { Criteria } from "../../../Shared/Domain/Criteria/Criteria";

const MONGODB_ID_ALREADY_EXISTING_ERROR_CODE = 11000

export class MongoPlantRepository implements PlantRepository {
  async save(plant: Plant, transaction: any): Promise<void> {
    await MongoPlantModel
      .init()
      .then(() => MongoPlantModel.create(
        [plant.toPrimitives()],
        {session: transaction}
      ))
      .catch((error) => {
        console.error(error)
        if (error.code === MONGODB_ID_ALREADY_EXISTING_ERROR_CODE) {
          throw new PlantAlreadyExists(plant.getId().toString());
        }
        throw new GeneralError("Tried to create a plant");
      });
  }


  async find(id: string): Promise<Nullable<Plant>> {
    return MongoPlantModel
      .init()
      .then(() => MongoPlantModel.findOne({ id }).lean())
      .then((doc: any) => doc ? Plant.fromPrimitives({...doc, id}) : null)
      .catch(err => { throw new Error(err) })
  }

  
  async search(criteria: Criteria): Promise<Nullable<Array<Plant>>> {
    return MongoPlantModel
      .init()
      .then(() => MongoPlantModel.find().limit(criteria.getLimit()).lean())
      .then(docs => docs
        ? docs.map((doc: any) => Plant.fromPrimitives({...doc}))
        : null
      )
      .catch(err => { 
        console.error(err)
        throw new Error(err)
       })
  }

  async remove(id: string): Promise<void> {
    return MongoPlantModel
      .init()
      .then(async() => { await MongoPlantModel.findOneAndRemove({id}) })
      .catch(err => { throw new Error(err) })
  }
}
