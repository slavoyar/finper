export class ListBuilder<T> {
  constructor(
    private readonly title: string,
    private readonly items: T[],
    private readonly customItemBuilder: (item: T) => string
  ) {}

  public build(): string {
    return `${this.title}\n\n${this.items.map(this.customItemBuilder).join('\n')}`.trim();
  }
}
