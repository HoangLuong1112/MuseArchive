import TypoRender from "./TypoRender";

type HighLightWordsProps = {
    text: string
    typographyLevel: "subtext" | "body" | "h4" | "h3" | "h2" | "h1"
    textColor?: string;
    highlight?: string[];
    highLightColor?: string;    //add a full color css tailwind in
    className?: string
}

// This component only render Highlight Words, do not use it to render Title
export default function HighLightWords ({
    text,
    typographyLevel = "body",
    textColor,
    highlight = [],
    highLightColor = 'text-primary1',
    className,
}: HighLightWordsProps) {

    let result = text;
    
    // Sort highlight by length (longest first) to avoid partial matches
    const sortedHighlightWords = [...highlight].sort((a, b) => b.length - a.length);
    
    // Replace each highlight word/phrase with a special marker
    const markers: { [key: string]: string } = {};
    let markerIndex = 0;
    
    sortedHighlightWords.forEach(highlightWord => {
        const marker = `__HIGHLIGHT_${markerIndex}__`;
        markers[marker] = highlightWord;
        markerIndex++;
        
        // Use case-insensitive replacement with word boundaries
        // const regex = new RegExp(`\\b${highlightWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        let regex;
        if (/^[a-zA-Z0-9]+$/.test(highlightWord)) {
            // chỉ dùng \b cho "từ"
            regex = new RegExp(`\\b${highlightWord}\\b`, 'gi');
        } else {
            // ký tự đặc biệt thì không có \b
            regex = new RegExp(highlightWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        }
        result = result.replace(regex, marker);
    });
    
    // Split by markers
    const parts = result.split(/(__HIGHLIGHT_\d+__)/);   
    
    
    // Render the parts with highlight
    return(
        <TypoRender typography={typographyLevel}>
            {parts.map((part, index) => {
                if (part.startsWith("__HIGHLIGHT_") && part.endsWith("__")) {
                    const highLightText = markers[part];
                    return (
                        <span key={index} className={`${highLightColor} ${className}`}>
                            {highLightText}
                        </span>
                    )
                } else {
                    return <span key={index} className={`${textColor} ${className}`}>{part}</span>
                }
            })}
        </TypoRender>
    )
}
