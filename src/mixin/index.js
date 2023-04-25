export default {
  methods: {
    checkPermission(permission, action) {
      const rolePermission = this.$store.state.permission.rolePermission
      const hasPermission = rolePermission.includes(permission)
      if (!hasPermission) {
        this.$message({
          message: '您没有' + action + '的权限，请联系管理员。',
          type: 'warning',
          duration: 2000
        })
      }
      return hasPermission
    }
  }
}