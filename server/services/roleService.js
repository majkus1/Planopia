exports.findSupervisorRole = async (userRoles) => {
	const roleToSupervisor = {
		IT: 'Kierownik IT',
		Bok: 'Kierownik BOK',
		Bukmacher: 'Kierownik Bukmacher',
		Marketing: 'Kierownik Marketing',
		'Kierownik IT': 'Zarząd',
		'Kierownik BOK': 'Zarząd',
		'Kierownik Bukmacher': 'Zarząd',
		'Kierownik Marketing': 'Zarząd',
		Zarząd: 'Zarząd',
	}

	for (let role of userRoles) {
		if (roleToSupervisor[role]) return roleToSupervisor[role]
	}
	return null
}
