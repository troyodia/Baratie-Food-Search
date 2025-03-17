import { factory, manyOf, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
  user: {
    id: primaryKey(faker.number.int),
    _id: faker.string.uuid,
    firstname: () =>
      faker.person.firstName.length > 10
        ? faker.person.firstName().slice(1)
        : faker.person.firstName(),
    lastname: () =>
      faker.person.lastName.length > 10
        ? faker.person.lastName().slice(1)
        : faker.person.lastName(),
    email: faker.internet.email,
    password: () => faker.internet.password({ length: 10 }),
    address: faker.location.streetAddress,
    city: faker.location.city,
    country: faker.location.country,
  },
  //to generate menu items for the restaraunt schema
  menus: {
    id: primaryKey(faker.number.int),
    name: faker.food.dish,
    price: () => faker.number.int({ min: 5, max: 50 }).toString(),
  },
  restaurant: {
    id: primaryKey(faker.number.int),
    _id: faker.string.uuid,

    owner: faker.string.uuid,
    cuisineItems: Array<string>,
    menu: manyOf("menus"),
    name: faker.company.name,
    city: faker.location.city,
    country: faker.location.country,
    deliveryPrice: () => faker.number.int({ min: 1, max: 10 }),
    deliveryTime: () => faker.number.int({ min: 1, max: 30 }),
    image: () => faker.image.urlLoremFlickr({ category: "food" }),
    lastUpdated: faker.date.anytime,
  },
});
