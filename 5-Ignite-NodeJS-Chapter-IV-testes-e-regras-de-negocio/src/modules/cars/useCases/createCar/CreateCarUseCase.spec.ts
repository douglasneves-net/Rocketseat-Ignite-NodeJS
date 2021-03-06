import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 183,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "brand",
      category_id: "category"
    });
    expect(car).toHaveProperty("id");
  });

  it('should not be able to create a car with exists license plate', async () => {
    expect(async () => {

      await createCarUseCase.execute({
        name: "Name Car1",
        description: "Description Car",
        daily_rate: 183,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "brand",
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "Name Car2",
        description: "Description Car",
        daily_rate: 183,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "brand",
        category_id: "category"
      })


    }).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create a car with available trye by default', async () => {

    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 183,
      license_plate: "ABCD-123",
      fine_amount: 60,
      brand: "brand",
      category_id: "category"
    })

    expect(car.available).toBe(true);

  });

});