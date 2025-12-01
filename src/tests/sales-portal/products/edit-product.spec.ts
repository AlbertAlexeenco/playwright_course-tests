import { ProductsApiService } from "api/service/products.service";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures";

// Реализовать е2е тест со следующими шагами:
//   - залогиниться
//   - Создать продукт через API
//   - Перейти на страницу Edit Product
//   - Заполнить поля валидными данными
//   - Сохранить продукт
//   - Проверить продукт в таблице
//   - Открыть модалку деталей продукта
//   - Проверить данные в модалке

//   За собой удаляем продукт через апи, разумеется:)

test.describe("[Sales Portal] [Products]", async() => {
    
    let id = "";
    let token = "";
    
    test.afterEach(async ({ productsApiService }) => {
        if (id) await productsApiService.delete(token, id);
        id = "";
    });

    test("Edit Product",
        {
            tag: [TAGS.SMOKE, TAGS.PRODUCTS, TAGS.UI, TAGS.REGRESSION],
        },
        async({ productsListPage, productsApiService, productsListUIService, editProductUIService }) => {

        //залогиниться
        token = await productsListPage.getAuthToken();

        //Создать продукт через API
        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;

        await productsListUIService.open();

        // Перейти на страницу Edit Product
        await editProductUIService.open(createdProduct);

        //   - Заполнить поля валидными данными
        //   - Сохранить продукт
        const editedProduct = await editProductUIService.editProductData();

         //   - Проверить продукт в таблице
        await productsListUIService.assertProductInTable(editedProduct.name, { visible: true })

        //   - Открыть модалку деталей продукта
        await productsListUIService.openDetailsModal(editedProduct.name);

        //   - Проверить данные в модалке
        const actual = await productsListUIService.productsListPage.detailsModal.getData();
        productsListUIService.assertDetailsData(actual, editedProduct);
   })
})