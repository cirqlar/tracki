import {
	useEffect,
	experimental_useEffectEvent as useEffectEvent,
	useState,
} from "react";

import {
	DayOfTheWeek,
	DAYS_OF_THE_WEEK,
	RELATIVE_DAYS,
	RelativeDay,
	TimeSettings,
	type DateField,
	type DateFieldSettings,
	type DateSettings,
	type DateType,
	type MonthSettings,
	type TimeType,
	type WeekSettings,
} from "./types";

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

const NewThingComponent: DateField["NewThingComponent"] = ({
	updateFieldData,
}) => {
	const [useDateSettings, setUseDate] = useState(false);
	const [dateType, setDateType] = useState<DateType>("day");
	const [dateCount, setDateCount] = useState(1);
	const [weekDays] = useState<WeekSettings["days"]>([]);
	const [monthVariant, setMonthVariant] =
		useState<MonthSettings["variant"]>("whenever");
	const [dayOfMonth, setDayOfMonth] = useState(1);
	const [monthRelative, setMonthRelative] = useState<RelativeDay>("First");
	const [monthRelativeDay, setRelativeDay] = useState<DayOfTheWeek>("Monday");

	const [useTimeSettings, setUseTime] = useState(false);
	const [timeType, setTimeType] = useState<TimeType>("hours");
	const [timeCount, setTimeCount] = useState(1);
	const [timeFrom, setTimeFrom] = useState("");
	const [times, setTimes] = useState<string[]>([]);

	const updateData = useEffectEvent((fieldSettings: DateFieldSettings) => {
		updateFieldData(fieldSettings);
	});

	useEffect(() => {
		let dateSettings: DateSettings;

		if (useDateSettings) {
			switch (dateType) {
				case "day":
					dateSettings = { type: "day", count: dateCount };
					break;
				case "week":
					dateSettings = {
						type: "week",
						count: dateCount,
						days: weekDays,
					};
					break;
				case "month":
					{
						dateSettings = {
							type: "month",
							count: dateCount,
							variant: "whenever",
						};
						if (monthVariant === "day") {
							dateSettings = {
								type: "month",
								count: dateCount,
								variant: "day",
								day: dayOfMonth,
							};
						} else if (monthVariant === "relative") {
							dateSettings = {
								type: "month",
								count: dateCount,
								variant: "relative",
								when: monthRelative,
								day_of_week: monthRelativeDay,
							};
						}
					}
					break;
				case "year":
					dateSettings = { type: "year", count: dateCount };
					break;
				default:
					return;
			}
		} else {
			dateSettings = { type: "anytime" };
		}

		let timeSettings: TimeSettings;

		if (useTimeSettings) {
			if (timeType === "hours") {
				timeSettings = {
					type: "hours",
					count: timeCount,
					from: timeFrom,
				};
			} else if (timeType === "times") {
				timeSettings = { type: "times", times };
			} else {
				return;
			}
		} else {
			timeSettings = { type: "anytime" };
		}

		updateData({
			date: dateSettings,
			time: timeSettings,
		});
	}, [
		dateCount,
		dateType,
		dayOfMonth,
		monthRelative,
		monthRelativeDay,
		monthVariant,
		timeCount,
		timeFrom,
		timeType,
		times,
		useDateSettings,
		useTimeSettings,
		weekDays,
	]);

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
						onChange={(e) => e.target.checked && setUseDate(false)}
					/>
				</label>
				<label className="px-4 py-2 text-center has-checked:bg-white/30">
					Specific Days
					<input
						type="radio"
						name="dateType"
						className="hidden"
						onChange={(e) => e.target.checked && setUseDate(true)}
					/>
				</label>
			</div>

			{useDateSettings && (
				<div className="mt-2" key="dateOptions">
					<fieldset className="flex w-full flex-col gap-2">
						<div className="flex w-full items-center gap-2">
							Every:
							<input
								type="number"
								defaultValue={dateCount}
								onChange={(e) =>
									setDateCount(e.target.valueAsNumber || 1)
								}
								className="w-0 grow rounded-sm border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
							/>
							<Select
								options={
									[
										"day",
										"week",
										"month",
										"year",
									] as DateType[]
								}
								formatOptionLabel={(option) => option + "(s)"}
								onChange={(e) =>
									setDateType(e.target.value as DateType)
								}
								defaultValue={dateType}
								divClassName="grow"
								className="w-0 rounded-sm border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
							/>
						</div>
						{dateType === "month" && (
							<>
								<div className="flex h-11 w-full items-center gap-2 pl-4">
									<input
										type="radio"
										name="monthsRadios"
										id="monthWhenever"
										defaultChecked={
											monthVariant === "whenever"
										}
										onChange={(e) =>
											e.target.checked &&
											setMonthVariant("whenever")
										}
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
										defaultChecked={monthVariant === "day"}
										onChange={(e) =>
											e.target.checked &&
											setMonthVariant("day")
										}
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
											defaultValue={dayOfMonth}
											onChange={(e) =>
												setDayOfMonth(
													Number(e.target.value) || 1,
												)
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
										defaultChecked={
											monthVariant === "relative"
										}
										onChange={(e) =>
											e.target.checked &&
											setMonthVariant("relative")
										}
									/>
									<label
										className="flex grow items-center gap-2"
										htmlFor="monthSubjectiveDay"
									>
										<Select
											divClassName="grow"
											className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
											options={RELATIVE_DAYS}
											defaultValue={monthRelative}
											onChange={(e) =>
												setMonthRelative(
													e.target
														.value as RelativeDay,
												)
											}
										/>
										<Select
											divClassName="grow"
											className="border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
											options={DAYS_OF_THE_WEEK}
											defaultValue={monthRelativeDay}
											onChange={(e) =>
												setRelativeDay(
													e.target
														.value as DayOfTheWeek,
												)
											}
										/>
									</label>
								</div>
							</>
						)}
						{dateType === "week" && (
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
						onChange={(e) => e.target.checked && setUseTime(false)}
					/>
				</label>
				<label className="px-4 py-2 text-center has-checked:bg-white/30">
					Specific Times
					<input
						type="radio"
						name="timeType"
						className="hidden"
						onChange={(e) => e.target.checked && setUseTime(true)}
					/>
				</label>
			</div>

			{useTimeSettings && (
				<div className="mt-2" key="timeOptions">
					<p className="my-2">At Every</p>
					<fieldset className="flex w-full flex-col gap-2">
						<div className="flex h-11 w-full items-center gap-2 pl-4">
							<input
								type="radio"
								name="timeRadios"
								id="timeHour"
								defaultChecked={timeType === "hours"}
								onChange={(e) =>
									e.target.checked && setTimeType("hours")
								}
							/>
							<label
								className="flex grow items-center gap-2"
								htmlFor="timeHour"
							>
								<input
									type="number"
									defaultValue={timeCount}
									onChange={(e) =>
										setTimeCount(
											e.target.valueAsNumber || 1,
										)
									}
									className="w-0 grow border-2 border-black bg-white px-4 py-2 outline-none focus-visible:border-current dark:bg-black"
								/>
								<p>hour from</p>
								<input
									type="time"
									defaultValue={timeFrom}
									onChange={(e) =>
										setTimeFrom(e.target.value)
									}
									className="w-0 grow-2 border-2 border-black bg-white py-2 pl-4 outline-none focus-visible:border-current dark:bg-black"
								/>
							</label>
						</div>
						<div className="flex h-11 w-full items-center gap-2 pl-4">
							<input
								type="radio"
								name="timeRadios"
								id="timeArbitrary"
								defaultChecked={timeType === "times"}
								onChange={(e) =>
									e.target.checked && setTimeType("times")
								}
							/>
							<label
								className="flex grow items-center gap-2"
								htmlFor="timeHour"
							>
								<input
									type="text"
									placeholder="10:00"
									defaultValue={times[0]}
									onChange={(e) => setTimes([e.target.value])}
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
