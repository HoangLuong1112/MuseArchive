import { ComponentBlock } from "@/app/types/ComponentBlock";
import { ClientRenderer } from "@/app/renderer/ClientRenderer";
import TypoRender from "./TypoRender";

// This component only renders text with full color, different from HighLighWords and PageTitle
export type CustomTitleProps = {
    title: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
    titleTypography?: 'h1' | 'h2' | 'h3' | 'h4' ;       // choose typography class
    subtitleTypography?: 'h4' | 'body' | 'subtext';
    titleColor?: string;                // add color class (tailwind css) for title
    subtitleColor?: string;             // add color class (tailwind css) for subtitle  
    titleSubtitleGap?: number;          // add gap number (tailwind css) between title and subtitle
    titleContentGap?: number;           // add gap number (tailwind css) between title block and content 
    content?: ComponentBlock[];         // Optional content to render below the title and subtitle
}

export default function CustomTitle({
    title,
    subtitle,
    align = "center",
    titleTypography = "h2",
    subtitleTypography = "body",
    titleColor = "complementary-black",
    subtitleColor = "complementary-black",
    titleSubtitleGap = 4,
    titleContentGap = 8,
    content,
}: CustomTitleProps){
    return (
        <div className={`container flex flex-col items-center gap-${titleContentGap}`}>

            {/* Title and subtitle */}
            <div className={`flex flex-col w-full gap-${titleSubtitleGap} text-${align}`}>
                <TypoRender typography={titleTypography}>
                    <span className={`text-${titleColor}`}>{title}</span>
                </TypoRender>
                <TypoRender typography={subtitleTypography}>
                    <span className={`text-${subtitleColor}`}>{subtitle}</span>
                </TypoRender>
            </div>

            {/* Render subcomponent */}
            {content && content.length > 0 && (
                <ClientRenderer blocks={content.map(b => ({...b, padding: false}))} />
            )}

        </div>    
    )   
}

/*
{
                componentName: 'CustomTitle',
                props: {
                    title: 'Software Solutions Tailored for Your Industry',
                    subtitle: 'At KYTIN, we specialize in software design and development, crafting tailored solutions to meet specific industry needs.',
                    content: [
                        {
                            componentName: 'ContentBlock',
                            props: {
                                contentAlign: 'right',
                                title: 'Key Capabilities',
                                description: 'Key Software SDiscover Our Specialized Software Development Solutions Designed to Support Your Industry Objectivestructures We Offer:',
                                media: {
                                    type: "image",
                                    src: '/images/coding.png',
                                    alt: 'Software Solutions Tailored for Your Industry',
                                },
                                border: true,
                                component2nd: [
                                    {
                                        componentName: 'FeatureList',
                                        props: {
                                            variant: 'plain',
                                            layout: 'vertical',
                                            typographyLevel: 'body',
                                            iconCommon: '/icon/checkbox.svg',
                                            showIcon: true,
                                            items: [
                                                {id: "1", text: "Agile development"},
                                                {id: "2", text: "User-centric designs"},
                                                {id: "3", text: "AI-driven automation"},
                                                {id: "4", text: "AI-driven automation"},
                                                {id: "5", text: "AI-driven automation"},
                                            ]
                                        },
                                    },
                                ],
                                className: 'overflow-hidden bg-light-gray',
                            }
                        }
                    ]
                }
            },
*/