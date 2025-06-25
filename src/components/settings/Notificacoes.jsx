import { useState } from "react";
import SettingSection from "./SettingSection";
import { Bell } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

const Notificacoes = () => {
	const [Notificacoes, setNotificacoes] = useState({
		push: true,
		email: false,
		sms: true,
	});

	return (
		<SettingSection icon={Bell} title={"Notificação"}>
			<ToggleSwitch
				label={"Notificações Push"}
				isOn={Notificacoes.push}
				onToggle={() => setNotificacoes({ ...Notificacoes, push: !Notificacoes.push })}
			/>
			<ToggleSwitch
				label={"Notificações Email"}
				isOn={Notificacoes.email}
				onToggle={() => setNotificacoes({ ...Notificacoes, email: !Notificacoes.email })}
			/>
			<ToggleSwitch
				label={"Notificações SMS"}
				isOn={Notificacoes.sms}
				onToggle={() => setNotificacoes({ ...Notificacoes, sms: !Notificacoes.sms })}
			/>
		</SettingSection>
	);
};
export default Notificacoes;
