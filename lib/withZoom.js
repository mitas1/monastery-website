if (typeof window !== "undefined") {
    const Zooming = require("zooming");
}

export const withZoom = () => ComposedComponent =>
    class extends React.Component {
        componentDidMount() {
            const zooming = new Zooming().listen(".img-zoomable");
        }
        componentWillUnMount() {
            // TODO delete zooming
        }
        render() {
            return <ComposedComponent {...this.props} />;
        }
    };
