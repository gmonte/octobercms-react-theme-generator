const supportsHistory = () => ('pushState' in window.history)

export default supportsHistory
