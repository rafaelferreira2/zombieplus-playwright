const { test } = require('../support/')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database');
const { beforeEach } = require('node:test');

test.beforeEach(async ({ page }) => {
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'pwd123')
  await page.login.isLoggedIn('Admin')
});

test('Deve poder cadastrar um novo filme', async ({ page }) => {
  const movie = data.create
  executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

  await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
  await page.toast.containText('Cadastro realizado com sucesso!')
});

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
  await page.movies.goForm()
  await page.movies.submit()

  await page.movies.alertlHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])
});