import '@testing-library/jest-dom'

// HTMLDialogElement není implementován v jsdom — mock pro showModal / close
HTMLDialogElement.prototype.showModal = vi.fn(function () {
  this.open = true
})
HTMLDialogElement.prototype.close = vi.fn(function () {
  this.open = false
  this.dispatchEvent(new Event('close'))
})
