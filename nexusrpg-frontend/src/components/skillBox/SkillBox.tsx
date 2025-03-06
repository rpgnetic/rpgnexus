import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dice6 } from "lucide-react";
import { type SpecialSkillValue } from '@/lib/schemas/sheetSchema';
import styles from './styles.module.scss';

interface SkillBoxProps {
    label: string;
    value: number;
    baseValue: number | SpecialSkillValue;
    onChange: (value: number) => void;
}

export function SkillBox({ label, value, baseValue, onChange }: SkillBoxProps) {
    const displayValue = value || (typeof baseValue === 'number' ? baseValue : 0);

    return (
        <FormItem className={styles.skillBox}>
            <div className={styles.skillContent}>
                <Checkbox className={styles.skillCheckbox} />
                <div className={styles.skillLabel}>{label}</div>
                <div className={styles.skillValues}>
                    <FormControl>
                        <Input
                            type="number"
                            value={String(displayValue)}
                            onChange={(e) => {
                                let newValue = e.target.value ? parseInt(e.target.value) : 0;
                                if (typeof baseValue === 'number') {
                                    newValue = Math.max(baseValue, Math.min(99, newValue));
                                } else {
                                    newValue = Math.max(0, Math.min(99, newValue));
                                }
                                onChange(newValue);
                            }}
                            className={styles.skillInput}
                            min={typeof baseValue === 'number' ? baseValue : 0}
                            max="99"
                        />
                    </FormControl>
                    <Button
                        variant="outline"
                        size="icon"
                        className={styles.diceButton}
                        type="button"
                    >
                        <Dice6 className={styles.diceIcon} />
                    </Button>
                </div>
            </div>
        </FormItem>
    );
}