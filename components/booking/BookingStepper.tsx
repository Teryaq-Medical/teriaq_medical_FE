interface StepperProps {
  currentStep: number;
}

const steps = [
  "تحديد المكان",
  "تحديد التخصص",
  "الوقت والتاريخ",
  "مراجعة الحجز",
];

export default function BookingStepper({ currentStep }: StepperProps) {
  return (
    <div className="flex justify-between items-center mb-10">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={step} className="flex-1 flex items-center">
            {/* Circle */}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  isCompleted || isActive
                    ? "bg-[#1ABAE2] text-white"
                    : "bg-gray-200 text-gray-400"
                }
              `}
            >
              {stepNumber}
            </div>

            {/* Label */}
            <span
              className={`
                mr-2 text-sm whitespace-nowrap
                ${
                  isCompleted || isActive
                    ? "text-blue-500 font-medium"
                    : "text-gray-400"
                }
              `}
            >
              {step}
            </span>

            {/* Line */}
            {stepNumber !== steps.length && (
              <div
                className={`
                  flex-1 h-[2px] mx-3
                  ${isCompleted ? "bg-blue-500" : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
