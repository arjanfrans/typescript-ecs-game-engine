export class MenuItem {
    constructor(
        public readonly name: string,
        public text: string,
        private readonly onAction?: (menuItem: MenuItem) => void
    ) {}

    action() {
        if (this.onAction) {
            this.onAction(this);
        }
    }
}
