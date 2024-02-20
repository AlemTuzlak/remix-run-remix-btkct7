export const getOptionalEnvValue = <T>(envKey: string, defaultValue: T) => {
  return process.env[envKey] ?? defaultValue;
};
export const getOptionalBoolValue = (envKey: string, defaultValue: false) => {
  const val = getOptionalEnvValue(envKey, defaultValue.toString());
  return val === 'true';
};

export function getEnvValue(key: string) {
  const value = process.env[key];

  return value;
}
