const Footer = () => {
  return (
    <footer id="mainFooter" className="py-4 bg-main-700">
      <div className="container">
        <p className="text-center">
          Sphenews &copy; {new Date().getFullYear()} - Made with <span className="text-red-700">&hearts;</span> using React JS </p>
      </div>
    </footer>
  )
}

export default Footer
