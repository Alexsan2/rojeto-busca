import { test, expect } from '@playwright/test';

test('Deve realizar o fluxo completo de compra e logout', async ({ page }) => {
  // 1. Acesso e Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 2. Filtro: Mudar para ordem de preço "Low to High" (do mais barato ao mais caro)
  // Isso testa se o sistema sabe organizar os produtos
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  
  // 3. Validação do Filtro: Verificar se o primeiro item é o mais barato ($7.99)
  const primeiroPreco = page.locator('.inventory_item_price').first();
  await expect(primeiroPreco).toHaveText('$7.99');

  // 4. Adicionar ao Carrinho
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

  // 5. Checkout rápido (apenas entrar e validar que o item está lá)
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.inventory_item_name')).toContainText('Onesie');

  // 6. Logout (Para garantir que a sessão fecha corretamente)
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  // 7. Validação Final: Verificar se voltou para a tela de login
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  
  // 📸 Foto da vitória final
  await page.screenshot({ path: 'fluxo-completo-sucesso.png' });
});