import { CSSProperties } from "react";
import "./AudioSlider.css";

export type AudioSliderProps = {
    value: number;
    onChange: (value: number) => void;

    min: number;
    max: number;

    step?: number;

    style?: CSSProperties;
}

export default function AudioSlider({ min, max, value, step, onChange, style }: AudioSliderProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",

            gap: 5,
            padding: 5
        }}>
            <div className={(value === 0)?("sprite_settings_sounds_off_color"):("sprite_settings_sounds_off_white")} style={{
                cursor: "pointer"
            }} onClick={() => onChange(0)}/>

            <div className="audio-slider sprite_dialog_slider-background" style={{
                ...style
            }}>
                <input type="range" step={step} min={min} max={max} value={value} onChange={(event) => onChange(Math.max(0, parseFloat((event.target as HTMLInputElement).value)))}/>
            </div>

            <div className={(value !== 0)?("sprite_settings_sounds_on_color"):("sprite_settings_sounds_on_white")} style={{
                cursor: "pointer"
            }} onClick={() => onChange(100)}/>
        </div>
    );
}
