import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-2xl transition-all duration-300 shadow-lg bg-white border-2 border-gray-200 hover:border-[#366EF3] justify-between flex flex-col overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Header/Icon Section */}
      <div className="flex-shrink-0">
        {header}
      </div>
      
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between p-6 space-y-4 group-hover/bento:translate-x-1 transition-transform duration-300">
        <div className="space-y-3">
          {/* Title */}
          <div className="flex items-start gap-3">
            {icon && (
              <div className="flex-shrink-0 mt-1">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <div className="text-sm text-gray-600 leading-relaxed">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

