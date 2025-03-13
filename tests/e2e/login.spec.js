const { test } = require('../support/')

test('Deve logar como administrador', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'pwd123')
  await page.movies.isLoggedIn()
});

test('Não deve logar como senha incorreta', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'abc123')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
  await page.toast.containText(message)
});

test('Não deve logar com email inválido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'abc123')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
  await page.toast.containText(message)
});

test('Não deve logar quando o email não é preenchido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('', 'abc123')
  await page.login.alertlHaveText('Campo obrigatório')
});

test('Não deve logar quando a senha não é preenchida', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', '')
  await page.login.alertlHaveText('Campo obrigatório')
});

test('Não deve logar nenhum campo é preenchido', async ({ page }) => {
  await page.login.visit()
  await page.login.submit('', '')
  await page.login.alertlHaveText(['Campo obrigatório', 'Campo obrigatório'])
});