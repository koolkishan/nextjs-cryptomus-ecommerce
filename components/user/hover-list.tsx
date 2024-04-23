import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  
  interface HoverListProps {
    hoverTrigger: React.ReactNode;
    hoverContent: React.ReactNode;
  }
  
  const HoverList = ({ hoverTrigger, hoverContent }: HoverListProps) => {
    return (
      <div className="flex">
        <HoverCard>
          <HoverCardTrigger>{hoverTrigger}</HoverCardTrigger>
          <HoverCardContent className="bg-primary-dark text-primary-txt m-4 w-[400px] border-primary-gray ">
            {hoverContent}
          </HoverCardContent>
        </HoverCard>
      </div>
    );
  };
  
  export { HoverList };
  