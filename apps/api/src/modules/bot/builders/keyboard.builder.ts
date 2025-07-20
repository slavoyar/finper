import { InlineKeyboardButton } from '@external/telegram/interfaces';

export class KeyboardBuilder {
  private rows: InlineKeyboardButton[][] = [];

  public addRow() {
    this.rows.push([]);
    return this;
  }

  public addColumn(button: InlineKeyboardButton) {
    this.rows[this.rows.length - 1].push(button);
    return this;
  }

  public construct(): InlineKeyboardButton[][] {
    return this.rows;
  }
}
