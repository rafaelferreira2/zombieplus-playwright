const { expect } = require('@playwright/test')

export class LoginPage {

  constructor(page) {
    this.page = page
  }

  async visit() {
    await this.page.goto('/admin/login')

    const loginForm = this.page.locator('.login-form')
    await expect(loginForm).toBeVisible()
  }

  async submit(email, password) {
    await this.page.getByPlaceholder('E-mail').fill(email)
    await this.page.getByPlaceholder('Senha').fill(password)
    await this.page.getByText('Entrar').click()
  }

  async alertlHaveText(text) {
    const alert = this.page.locator('span[class$=-alert]')
    await expect(alert).toHaveText(text)
  }

}