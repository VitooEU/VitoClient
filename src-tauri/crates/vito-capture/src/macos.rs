use std::ffi::{c_char, CStr, CString};

extern "C" {
    fn vace_capture_supported() -> bool;
    fn vace_input_monitoring(request: bool) -> bool;
    fn vace_open_permission_settings(permission: u8) -> bool;
    fn vace_capture_main(logger: extern "C" fn(*const c_char));
    fn vace_open_apps(foreground: bool) -> *mut c_char;
    fn vace_free_string(value: *mut c_char);
    fn vace_hotkeys(bindings: *const c_char, callback: extern "C" fn(u8)) -> i32;
}

pub fn run() {
    let args: Vec<String> = std::env::args().collect();
    if let Some(dir) = args
        .iter()
        .position(|arg| arg == "--log-dir")
        .and_then(|i| args.get(i + 1))
    {
        let setup = vito_logging::LogSetup::new(dir, "capture.log").console(false);
        if let Err(error) = vito_logging::init(setup) {
            eprintln!("Could not set up capture logging: {error}");
        }
    }
    unsafe { vace_capture_main(log_native) }
}

pub fn open_apps(foreground: bool) -> String {
    unsafe {
        let ptr = vace_open_apps(foreground);
        if ptr.is_null() {
            return "[]".into();
        }
        let value = CStr::from_ptr(ptr).to_string_lossy().into_owned();
        vace_free_string(ptr);
        value
    }
}

#[derive(Debug, PartialEq, Eq)]
pub enum HotkeyError {
    InvalidShortcut,
    PermissionDenied,
    TapUnavailable,
}

pub fn hotkeys(bindings: &str, callback: extern "C" fn(u8)) -> Result<(), HotkeyError> {
    let bindings = CString::new(bindings).map_err(|_| HotkeyError::InvalidShortcut)?;
    match unsafe { vace_hotkeys(bindings.as_ptr(), callback) } {
        0 => Ok(()),
        1 => Err(HotkeyError::InvalidShortcut),
        2 => Err(HotkeyError::PermissionDenied),
        _ => Err(HotkeyError::TapUnavailable),
    }
}

extern "C" fn log_native(message: *const c_char) {
    let message = unsafe { CStr::from_ptr(message) }.to_string_lossy();
    let message = vito_logging::mask_sensitive_data(&message);
    eprintln!("{message}");
    log::info!("{message}");
}

pub fn capture_supported() -> bool {
    unsafe { vace_capture_supported() }
}

pub fn input_monitoring(request: bool) -> bool {
    unsafe { vace_input_monitoring(request) }
}

pub fn open_permission_settings(permission: u8) -> bool {
    unsafe { vace_open_permission_settings(permission) }
}
