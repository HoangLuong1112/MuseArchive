    type TypoRenderProps = {
        children: React.ReactNode;  //  use children to auto wrap any JSX element in 
        typography: "h1" | "h2" | "h3" | "h4" | "body" | "subtext";
    }

    //  Render text with specific typography
    export default function TypoRender({
        children,
        typography
    }: TypoRenderProps) {
        
        switch (typography) {
            case "h1":
                return <h1>{children}</h1>;
            case "h2":
                return <h2>{children}</h2>;
            case "h3":
                return <h3>{children}</h3>;
            case "h4":
                return <h4>{children}</h4>;
            default:
                return (
                    <p className={typography === "subtext" ? "subtext" : "paragraph"}>
                        {children}
                    </p>
                );
        }
    }