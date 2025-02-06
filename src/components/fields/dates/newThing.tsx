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
}) => {
	const [type] = useState<DateType>("anytime");
	const [everyDate, setEveryDate] = useState<EveryDate>("day");
	const [everyDateFreq, setEveryDateFreq] = useState(1);

	const [dateType, setDateType] = useState<DateType>("anytime");
	const [timeType, setTimeType] = useState<DateType>("anytime");

	const updateData = useEffectEvent((fieldSettings: DateSettings) => {
		updateFieldData(fieldSettings);
	});

	useEffect(() => {
		updateData({
			type,
		});
	}, [type]);

	return (
		<div className="rounded-sm bg-gray-800 p-4">
			<p className="mb-2">Date Settings</p>
			<div className="grid grid-cols-2 rounded-lg border-2">
				<label className="border-r-2 px-4 py-2 text-center has-checked:bg-white/30">
					Any Day
					<input
						type="radio"
						name="dateType"
						className="hidden"
						defaultChecked={true}
						onChange={(e) =>
							e.target.checked && setDateType("anytime")
						}
					/>
				</label>
				<label className="px-4 py-2 text-center has-checked:bg-white/30">
					Specific Days
					<input
						type="radio"
						name="dateType"
						className="hidden"
						onChange={(e) =>
							e.target.checked && setDateType("specific")
						}
					/>
				</label>
			</div>

			{dateType === "specific" && (
				<div className="mt-2" key="dateOptions">
					<fieldset className="flex w-full flex-col gap-2">
						<div className="flex w-full items-center gap-2">
							Every:
							<input
								type="number"
								defaultValue={everyDateFreq}
								onChange={(e) =>
									setEveryDateFreq(
										Number(e.target.value) || 1,
									)
								}
								className="w-0 grow rounded-sm border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
							/>
							<Select
								options={["day", "week", "month", "year"]}
								formatOptionLabel={(option) => option + "(s)"}
								onChange={(e) =>
									setEveryDate(e.target.value as EveryDate)
								}
								defaultValue={everyDate}
								divClassName="grow"
								className="w-0 rounded-sm border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
							/>
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
										<Select
											options={Array.from({
												length: 32,
											}).map((_, i) => i + 1)}
											formatOptionLabel={(val) =>
												val == 33
													? "last day"
													: `${val}${getTh(val)}`
											}
											divClassName="grow"
											className="rounded-sm border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
										/>
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
										<Select
											divClassName="grow"
											className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
											options={[
												"First",
												"Second",
												"Third",
												"Fourth",
											]}
										/>
										<Select
											divClassName="grow"
											className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
											options={[
												"Monday",
												"Tuesday",
												"Wednesday",
												"Thursday",
												"Friday",
												"Saturday",
												"Sunday",
											]}
										/>
									</label>
								</div>
							</>
						)}
						{everyDate === "week" && (
							<div className="flex h-11 w-full items-center gap-2">
								<label
									className="flex items-center gap-2"
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

			<p className="mt-4 mb-2">Time Settings</p>
			<div className="mt-2 grid grid-cols-2 rounded-lg border-2">
				<label className="border-r-2 px-4 py-2 text-center has-checked:bg-white/30">
					Any Time
					<input
						type="radio"
						name="timeType"
						className="hidden"
						defaultChecked={true}
						onChange={(e) =>
							e.target.checked && setTimeType("anytime")
						}
					/>
				</label>
				<label className="px-4 py-2 text-center has-checked:bg-white/30">
					Specific Times
					<input
						type="radio"
						name="timeType"
						className="hidden"
						onChange={(e) =>
							e.target.checked && setTimeType("specific")
						}
					/>
				</label>
			</div>

			{timeType === "specific" && (
				<div className="mt-2" key="timeOptions">
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
