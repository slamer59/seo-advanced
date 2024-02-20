// @ts-nocheck
import { v4 as uuidv4 } from "uuid";

export function Step({ stepNumber, stepTitle, stepDescription }) {
    return (
        <li className="my-5 font-semibold text-primary">
            {/* Étape {stepNumber} : */}
            {stepTitle}
            {stepDescription.map((desc) => (
                <p className="p-2 text-base font-normal text-black">{desc.text}</p>
            ))}
        </li >
    );
}

export function HowTo({ howToData }) {
    const { name, estimatedCost, supply, totalTime, step } = howToData;

    return (
        <>
            <h2 className="my-5 text-3xl font-bold text-primary">{name}</h2>
            {estimatedCost && <p className="my-5 text-2xl italic font-bold text-primary">Coût estimé : {estimatedCost?.value} {estimatedCost.currency}</p>}
            {supply &&
                <>
                    <p className="my-5 text-2xl font-bold text-primary">Outils nécessaires : </p>
                    <ul className="pl-4 list-disc">
                        {supply?.map((item, index) => (
                            <li key={uuidv4()} className="ml-4">{item}</li>
                        ))}
                    </ul>
                </>
            }
            <ul className="pl-4 list-decimal">
                {step.map((stp, index) => (
                    <Step
                        key={uuidv4()}
                        stepNumber={index + 1}
                        stepTitle={stp.name}
                        stepDescription={stp.itemListElement}
                    />
                ))}
            </ul>
            <p className="mt-4">Temps total : {totalTime}</p>
        </>
    );
}