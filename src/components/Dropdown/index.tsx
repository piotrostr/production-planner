import { Stack } from "@mui/material"
import { Select, MenuItem } from "@mui/material"

interface TextFieldProps {
  placeholder: string
  icon: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Dropdown({ placeholder, icon, open, setOpen }: TextFieldProps) {
  return (
    <Stack height={45} width="fit-content" direction="row">
      <Select
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        fullWidth
        displayEmpty
        renderValue={(value: number) => {
          return value == undefined ? (
            <div style={{ color: "#a1a1a1" }}>{placeholder}</div>
          ) : (
            <>{value}</>
          )
        }}
        sx={{
          all: "unset",
          border: "1px solid black",
          width: 339,
          height: "100%",
          "& .MuiOutlinedInput-root": {
            height: "100%",
          },
          "& .MuiOutlinedInput-input": {
            height: 45,
            padding: 0,
            lineHeight: "45px",
            ml: 3,
          },
        }}
        IconComponent={undefined}
        inputProps={{
          IconComponent: () => null,
          MenuProps: {
            PaperProps: {
              transitionDuration: 0,
            },
            MenuListProps: {
              sx: {
                backgroundColor: "background.default",
              },
            },
          },
        }}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <Stack
        width={60}
        height="100%"
        alignItems="cener"
        justifyContent="center"
        onClick={() => setOpen(!open)}
        sx={{
          cursor: "pointer",
          bgcolor: "#D9D9D9",
          borderRight: "1px solid black",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
        }}
      >
        <Stack
          width={60}
          height="100%"
          alignItems="cener"
          justifyContent="center"
          sx={{
            bgcolor: "#D9D9D9",
          }}
        >
          <Stack alignItems="cener" justifyContent="center" margin="auto">
            {icon}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
