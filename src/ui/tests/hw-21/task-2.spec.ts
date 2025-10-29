// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import test, { expect } from "@playwright/test";
import { Page } from "@playwright/test";

interface ITableRow {
    "Last Name": string;
    "First Name": string;
    Email: string;
    Due: string;
    "Web Site": string;
}

const expectedTable: ITableRow[] = [
    {
      "Last Name": "Smith",
      "First Name": "John",
      Email: "jsmith@gmail.com",
      Due: "$50.00",
      "Web Site": "http://www.jsmith.com"
    },
    {
      "Last Name": "Bach",
      "First Name": "Frank",
      Email: "fbach@yahoo.com",
      Due: "$51.00",
      "Web Site": "http://www.frank.com"
    },
    {
      "Last Name": "Doe",
      "First Name": "Jason",
      Email: "jdoe@hotmail.com",
      Due: "$100.00",
      "Web Site": "http://www.jdoe.com"
    },
    {
      "Last Name": "Conway",
      "First Name": "Tim",
      Email: "tconway@earthlink.net",
      Due: "$50.00",
      "Web Site": "http://www.timconway.com"
    }
  ];

async function getTableRow(page: Page, email: string){
    
    const tableSecond = page.locator("table#table2");
    const headerText = await tableSecond.locator("th").allInnerTexts();
    headerText.pop();

    const tableRows = tableSecond.locator("tbody tr");
    const rowLocator = tableRows.filter({has: page.locator("td")}).filter({hasText: email});
    if (!rowLocator){
        throw new Error('Email not found');
    }

    const cells = await rowLocator.locator("td").filter({hasNot: page.locator('a')}).allInnerTexts();

    const rowData = headerText.reduce<ITableRow>((res, header, i) => {
        res[header] = cells[i];
        return res;
    }, {} as ITableRow)

    return rowData;
}

test.describe("[herokuapp][Sortable Data Tables]", () => {
    const url = "https://the-internet.herokuapp.com/";
    test("Test getTableRow() with data from Table 2", async ({ page }) => {
        const sortableDataTablesBtn = page.locator(`[href="/tables"]`);
        const tableSecond = page.locator("table#table2");
        await page.goto(url);
        await sortableDataTablesBtn.click();
        await expect(tableSecond).toBeVisible()

        for(const expectedRow of expectedTable){
            const rowFromTable = await getTableRow(page, expectedRow.Email);
            expect.soft(rowFromTable).toEqual(expectedRow);
        }
    })
})





//--------------------------------------
// async function getInfoFromTable(page:Page) {
//     const tableSecond = page.locator("table#table2");
//     const headerText = await tableSecond.locator("th").allInnerTexts();
//     headerText.pop();
//     const tableRows = await tableSecond.locator("tbody tr").all();

//     const tableData: ITableRow[] = [];

//     for(const row of tableRows){
//         const rowLocator = row.locator("td").filter({hasNot : page.locator("a")});
//         const cells = await rowLocator.allInnerTexts();

//         if (headerText.length !== cells.length) {
//             throw new Error('Header and cell count mismatch:');
//         }

//         const rowData = headerText.reduce<ITableRow>((res, header, i) => {
//             res[header] = cells[i];
//             return res;
//         }, {} as ITableRow)
//         tableData.push(rowData);
//     }
//     return tableData;
// }

//  const found = await getTableRow(page, "jdoe@hotmail.com");
//         console.log(found);