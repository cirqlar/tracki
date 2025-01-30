import { DateField, DateSettings, DateType } from "./types";
import React, {
	useEffect,
	experimental_useEffectEvent as useEffectEvent,
	useState,
} from "react";

const JustEverything = (
	props: React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> & { specifictext: string; settingstitle: string },
) => {
	return (
		<div className="rounded-sm bg-gray-800 p-4">
			<p className="mb-4">{props.settingstitle}</p>
			<select {...props} className="bg-white px-4 py-2 dark:bg-black">
				<option value="anytime">Anytime</option>
				<option value="specific">{props.specifictext}</option>
			</select>
			{props.children}
		</div>
	);
};

const getTh = (i: number) => {
	if (i === 1) {
		return "st";
	} else if (i === 2) {
		return "nd";
	} else if (i === 3) {
		return "rd";
	} else {
		return "th";
	}
};

type EveryDate = "day" | "week" | "month" | "year";

const NewThingComponent: DateField["NewThingComponent"] = ({
	updateFieldData,
	variant,
}) => {
	const [type, setType] = useState<DateType>("anytime");
	const [everyDate, setEveryDate] = useState<EveryDate>("day");
	const [everyDateFreq, setEveryDateFreq] = useState(1);

	const updateData = useEffectEvent((fieldSettings: DateSettings) => {
		updateFieldData(fieldSettings);
	});

	useEffect(() => {
		updateData({
			type,
		});
	}, [type]);

	switch (variant) {
		case "default":
			return (
				<JustEverything
					onChange={(e) => setType(e.target.value as DateType)}
					defaultValue={type}
					specifictext="Specific Days/Times"
					settingstitle="Date & Time Settings"
				>
					{type === "specific" && (
						<div className="">
							<p className="my-2">Every:</p>
							<fieldset className="flex w-full flex-col gap-2">
								<div className="flex w-full gap-2">
									<input
										type="number"
										defaultValue={everyDateFreq}
										onChange={(e) =>
											setEveryDateFreq(
												Number(e.target.value) || 1,
											)
										}
										className="w-0 grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
									/>
									<select
										onChange={(e) =>
											setEveryDate(
												e.target.value as EveryDate,
											)
										}
										defaultValue={everyDate}
										className="w-0 grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
									>
										<option value="day">day(s)</option>
										<option value="week">week(s)</option>
										<option value="month">month(s)</option>
										<option value="year">year(s)</option>
									</select>
								</div>
								{everyDate === "month" && (
									<>
										<div className="flex h-11 w-full items-center gap-2 pl-4">
											<input
												type="radio"
												name="monthsRadios"
												id="monthWhenever"
											/>
											<label
												className=""
												htmlFor="monthWhenever"
											>
												Whenever
											</label>
										</div>
										<div className="flex h-11 w-full items-center gap-2 pl-4">
											<input
												type="radio"
												name="monthsRadios"
												id="monthObjectiveDay"
											/>
											<label
												className="flex grow items-center gap-2"
												htmlFor="monthObjectiveDay"
											>
												<p>on the</p>
												<select className="grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black">
													{Array.from({
														length: 31,
													}).map((_, i) => (
														<option
															key={i + 1}
															value={i + 1}
														>
															{i + 1}
															{getTh(i + 1)}
														</option>
													))}
													<option value={33}>
														last day
													</option>
												</select>
											</label>
										</div>
										<div className="flex h-11 w-full items-center gap-2 pl-4">
											<input
												type="radio"
												name="monthsRadios"
												id="monthSubjectiveDay"
											/>
											<label
												className="flex grow items-center gap-2"
												htmlFor="monthSubjectiveDay"
											>
												<select className="grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black">
													<option value="first">
														First
													</option>
													<option value="second">
														Second
													</option>
													<option value="third">
														Third
													</option>
													<option value="fourth">
														Fourth
													</option>
													<option value="last">
														Last
													</option>
												</select>
												<select className="grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black">
													<option value="monday">
														Monday
													</option>
													<option value="tuesday">
														Tuesday
													</option>
													<option value="wednesday">
														Wednesday
													</option>
													<option value="thursday">
														Thursday
													</option>
													<option value="friday">
														Friday
													</option>
													<option value="saturday">
														Saturday
													</option>
													<option value="sunday">
														Sunday
													</option>
												</select>
											</label>
										</div>
									</>
								)}
							</fieldset>

							<p className="my-2">At Every</p>
							<fieldset className="flex w-full flex-col gap-2">
								<div className="flex h-11 w-full items-center gap-2 pl-4">
									<input
										type="radio"
										name="timeRadios"
										id="timeWhenever"
									/>
									<label className="" htmlFor="timeWhenever">
										Whenever
									</label>
								</div>
								<div className="flex h-11 w-full items-center gap-2 pl-4">
									<input
										type="radio"
										name="timeRadios"
										id="timeHour"
									/>
									<label
										className="flex grow items-center gap-2"
										htmlFor="timeHour"
									>
										<input
											type="number"
											defaultValue={1}
											className="w-0 grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
										/>
										<p>hour from</p>
										<input
											type="time"
											defaultValue={"10:00"}
											className="w-0 grow-2 border-2 border-black bg-white py-2 pl-4 outline-none focus-visible:border-current dark:bg-black"
										/>
									</label>
								</div>
								<div className="flex h-11 w-full items-center gap-2 pl-4">
									<input
										type="radio"
										name="timeRadios"
										id="timeArbitrary"
									/>
									<label
										className="flex grow items-center gap-2"
										htmlFor="timeHour"
									>
										<input
											type="text"
											placeholder="10:00"
											className="w-0 grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
										/>
									</label>
								</div>
							</fieldset>
						</div>
					)}
				</JustEverything>
			);
		case "date-only":
			return (
				<JustEverything
					onChange={(e) => setType(e.target.value as DateType)}
					defaultValue={type}
					settingstitle="Date Settings"
					specifictext="Specific Days"
				/>
			);
		case "time-only":
			return (
				<JustEverything
					onChange={(e) => setType(e.target.value as DateType)}
					defaultValue={type}
					settingstitle="Time Settings"
					specifictext="Specific Times"
				/>
			);

		default:
			console.error(`Error: Unhandled component variant ${variant}`);
			return <div>Error, Unhandled component</div>;
	}
};

export default NewThingComponent;
