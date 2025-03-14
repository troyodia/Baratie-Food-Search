import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
  user: {
    id: primaryKey(faker.number.int),
    _id: faker.string.uuid,
    firstname: faker.person.firstName,
    lastname: faker.person.lastName,
    email: faker.internet.email,
    password: () => faker.internet.password({ length: 10 }),
    address: faker.location.streetAddress,
    city: faker.location.city,
    country: faker.location.country,
  },
});
