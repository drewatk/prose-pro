// import fs from "fs-extra";
// import utils from "../../app/git-abs/utils";

// describe("PathNotExist() tests", () => {
//   test("Path exists should resolve", async () => {
//     const filePath = "./temp-test.txt";

//     await unlinkIgnoreError(filePath);

//     await expect(utils.pathNotExist(filePath)).resolves.toBe();
//   });

//   test("Path exists should reject", async () => {
//     const filePath = "./temp-test.txt";

//     await fs.ensureFile(filePath);

//     await expect(utils.pathNotExist(filePath)).rejects.toThrow(
//       expect.any(Error)
//     );

//     await unlinkIgnoreError(filePath);
//   });
// });

// describe("CreateDirectory() tests", () => {
//   test("Create Directory should resolve", async () => {
//     const filePath = "./temp-folder";

//     await unlinkIgnoreError(filePath);

//     await expect(utils.createDirectory(filePath)).resolves.toBe(null);
//   });
// });

// describe("CreateFile() tests", () => {
//   test("Create File valid test", async () => {
//     const filePath = "./temp-file.txt";

//     await utils.createFile(filePath);

//     await expect(fs.existsSync(filePath)).toEqual(true);

//     await unlinkIgnoreError(filePath);
//   });
// });

// describe("WriteJSONToFile() tests", () => {
//   test("Write Json valid test", async () => {
//     const filePath = "./temp.json";
//     const testObj = { key: "value" };

//     await utils.writeJSONToFile(filePath, testObj);

//     const jsonString = await fs.readFile(filePath);

//     await expect(JSON.parse(jsonString)).toMatchObject(testObj);

//     await unlinkIgnoreError(filePath);
//   });
// });

// describe("ReadJSONFromFole() tests", () => {
//   test("Read Json valid test", async () => {
//     const filePath = "./temp.json";
//     const testObj = { key: "value" };

//     await unlinkIgnoreError(filePath);

//     await fs.writeFile(filePath, JSON.stringify(testObj));

//     await expect(utils.readJSONFromFile(filePath)).resolves.toMatchObject(
//       testObj
//     );

//     await unlinkIgnoreError(filePath);
//   });
// });

// async function unlinkIgnoreError(filePath) {
//   try {
//     await fs.unlink(filePath);
//     return Promise.resolve();
//   } catch (err) {
//     return Promise.resolve();
//   }
// }
