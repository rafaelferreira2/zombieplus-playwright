const { test, expect } = require('../support/')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database');

test.beforeAll(async () => {
  await executeSQL(`DELETE from movies;`)
});

test.beforeEach(async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
});

test('Deve poder cadastrar um novo filme', async ({ page }) => {
  const movie = data.create

  await page.movies.create(movie)
  await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
});

test('Deve poder remover um novo filme', async ({ page, request }) => {
  const movie = data.to_remove

  await request.api.postMovie(movie)

  await page.goto('/admin/movies')
  await page.login.isLoggedIn('Admin')

  await page.movies.remove(movie.title)

  await page.popup.haveText('Filme removido com sucesso.')
});

test('Não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
  const movie = data.duplicate

  await request.api.postMovie(movie)

  await page.movies.create(movie)
  await page.popup.haveText(
    `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  )
});

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
  await page.movies.goForm()
  await page.movies.submit()

  await page.movies.alertlHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});