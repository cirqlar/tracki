import {
	useEffect,
	experimental_useEffectEvent as useEffectEvent,
	useState,
} from "react";

import { type DateField, type DateSettings, type DateType } from "./types";

import Select from "@/components/form/select";

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
	fieldSettings,
}) => {
	const [type, setType] = useState<DateType>("anytime");
	const [everyDate, setEveryDate] = useState<EveryDate>("day");
	const [everyDateFreq, setEveryDateFreq] = useState(1);

	const updateData = useEffectEvent((fieldSettings: DateSettings) => {
		updateFieldData(fieldSettings);
	});
	const getVariant = useEffectEvent(() => fieldSettings!.variant);

	useEffect(() => {
		updateData({
			type,
			variant: getVariant(),
		});
	}, [type]);

	const variant = fieldSettings?.variant;

	const title =
		variant === "date-time"
			? "Date & Time Settings"
			: variant === "date-only"
				? "Date Settings"
				: "Time Settings";
	const specificLabel =
		variant === "date-time"
			? "Specific Date/Time"
			: variant === "date-only"
				? "Specific Date"
				: "Specific Time";

	return (
		<div className="rounded-sm bg-gray-800 p-4">
			<p className="mb-4">{title}</p>
			<Select
				defaultValue={type}
				options={["anytime", "specific"]}
				formatOptionLabel={(d) =>
					d === "anytime" ? "Anytime" : specificLabel
				}
				onChange={(ev) => setType(ev.target.value as DateType)}
			/>
			{type === "specific" && variant !== "time-only" && (
				<div className="" key="dateOptions">
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
									setEveryDate(e.target.value as EveryDate)
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
									<label className="" htmlFor="monthWhenever">
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
											<option value={33}>last day</option>
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
											<option value="first">First</option>
											<option value="second">
												Second
											</option>
											<option value="third">Third</option>
											<option value="fourth">
												Fourth
											</option>
											<option value="last">Last</option>
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
						{everyDate === "week" && (
							<div className="flex h-11 w-full items-center gap-2 pl-4">
								<label
									className="flex grow items-center gap-2"
									htmlFor="dateWeekly"
								>
									On
								</label>
								<select
									id="dateWeekly"
									multiple
									className="max-h-full grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
								>
									<option value="monday">Monday</option>
									<option value="tuesday">Tuesday</option>
									<option value="wednesday">Wednesday</option>
									<option value="thursday">Thursday</option>
									<option value="friday">Friday</option>
									<option value="saturday">Saturday</option>
									<option value="sunday">Sunday</option>
								</select>
							</div>
						)}
					</fieldset>
				</div>
			)}
			{type === "specific" && variant !== "date-only" && (
				<div className="" key="timeOptions">
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
		</div>
	);
};

export default NewThingComponent;
