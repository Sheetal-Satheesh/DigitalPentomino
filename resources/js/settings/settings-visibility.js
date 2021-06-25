class SettingsVisibility {
    constructor() {
        this.visibility = {};
    }

    setVisible(heading, subheading, isVisible) {
        if (this.visibility[heading] === undefined) {
            this.visibility[heading] = {};
            this.visibility[heading].subheadings = {};
        }

        if (this.visibility[heading].subheadings[subheading] === undefined) {
            this.visibility[heading].subheadings[subheading] = {};
        }

        this.visibility[heading].subheadings[subheading] = isVisible;

        let atLeastOneVisible = false;
        for (let subheading in this.visibility[heading].subheadings) {
            if (this.visibility[heading].subheadings[subheading] === true) {
                atLeastOneVisible = true;
            }
        }
        this.visibility[heading].isVisible = atLeastOneVisible;
    }

    isVisible(heading, subheading) {
        if (subheading === undefined && this.visibility[heading] === undefined) {
            throw new Error("Unknown settings heading: " + heading);
        }

        if (subheading === undefined) return this.visibility[heading].isVisible === true;

        if (this.visibility[heading].subheadings[subheading] === undefined) {
            throw new Error("Unknown settings entry: " + heading + "." + subheading);
        }

        return this.visibility[heading].subheadings[subheading] === true;
    }
}
